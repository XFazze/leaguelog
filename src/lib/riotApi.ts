import { RegionNames } from './gameConstants';
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { Rank, User, Mastery, Ratelimit } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { REACT_LOADABLE_MANIFEST } from 'next/dist/shared/lib/constants';

export async function get_user_by_username(region: string = '', username: string = ''): Promise<User | null> {
    if (!region || !username) {
        return null;
    }
    const region_format = Object.keys(RegionNames)[Object.values(RegionNames).indexOf(region)];
    const url = `${region_format}.${process.env.RIOT_URL}summoner/v4/summoners/by-name/${username}`;
    var user = await prisma.user.findFirst({ where: { name: username } });
    if (user != null) {
        if ((Date.now() - user.updatedAt.getTime()) / 1000 > 30) {
            // seconds
            user = await request_riot<User>(url);
        }
    } else {
        user = await request_riot<User>(url);
    }
    await prisma.user.upsert({
        where: { accountId: user.accountId },
        update: user,
        create: user,
    });
    user.updatedAt = new Date();
    return user;
}

export async function get_ranks_by_summonerId(region: string = '', summonerId: string = '') {
    if (!region || !summonerId) {
        throw Error(`RANKS. Regrion:${region} or summonerId:${summonerId} does not exist.`);
    }
    const region_format = Object.keys(RegionNames)[Object.values(RegionNames).indexOf(region)];
    const url = `${region_format}.${process.env.RIOT_URL}league/v4/entries/by-summoner/${summonerId}`;
    var ranks = await request_riot<[any]>(url);
    ranks.forEach(async rank => {
        if ('miniSeries' in rank) {
            rank.miniSerieswins = rank.miniSeries.wins
            rank.miniSerieslosses = rank.miniSeries.losses
            rank.miniSeriesprogress = rank.miniSeries.progress
            rank.miniSeriestarget = rank.miniSeries.target
        }
        await prisma.rank.create({ data: rank });

    });
    // var solo_rank = await prisma.ranks.findFirst({
    //     where: { summonerId: summonerId, queueType: 'RANKED_SOLO_5x5' },
    //     orderBy: { createdAt: 'desc' },
    // });
    // var flex_rank = await prisma.ranks.findFirst({
    //     where: { summonerId: summonerId, queueType: 'RANKED_TEAM_5x5' },
    //     orderBy: { createdAt: 'desc' },
    // });
    // ranks.forEach(async (rank) => {
    //     if (rank.queueType == 'RANKED_SOLO_5x5') {
    //         if (!solo_rank ||
    //             (rank.tier !== solo_rank.tier ||
    //                 rank.rank !== solo_rank.rank ||
    //                 rank.leaguePoints !== solo_rank.leaguePoints ||
    //                 rank.wins !== solo_rank.wins ||
    //                 rank.losses !== solo_rank.losses ||
    //                 rank.veteran !== solo_rank.veteran ||
    //                 rank.inactive !== solo_rank.inactive ||
    //                 rank.freshBlood !== solo_rank.freshBlood ||
    //                 rank.hotStreak !== solo_rank.hotStreak)
    //         ) {
    //             await prisma.ranks.create({ data: rank });

    //         }
    //     } else if (rank.queueType == 'RANKED_TEAM_5x5') {
    //         if (!flex_rank ||
    //             (rank.tier !== flex_rank.tier ||
    //                 rank.rank !== flex_rank.rank ||
    //                 rank.leaguePoints !== flex_rank.leaguePoints ||
    //                 rank.wins !== flex_rank.wins ||
    //                 rank.losses !== flex_rank.losses ||
    //                 rank.veteran !== flex_rank.veteran ||
    //                 rank.inactive !== flex_rank.inactive ||
    //                 rank.freshBlood !== flex_rank.freshBlood ||
    //                 rank.hotStreak !== flex_rank.hotStreak)
    //         ) {
    //             await prisma.ranks.create({ data: rank });

    //         }
    //     }
    // });
    return ranks
}
export async function get_matchhistory_by_puuid(large_region: string = '', puuid: string = '') {
    if (!large_region || !puuid) {
        throw Error(`MATCHHISTORY. Region${large_region}  or puuid${puuid} does not exist.`);
    }
    const url = `${large_region}.${process.env.RIOT_URL}match/v5/matches/by-puuid/${puuid}/ids`;
    var match_history: string[] = [];
    var match_history_100 = [];
    var index = 0
    while (true) {
        match_history_100 = await request_riot<string[]>(url, { start: (index * 100).toString(), count: "100" });
        match_history.concat(match_history_100);
        index += 1;
        if (match_history_100.length != 100) {
            break
        }
    }
    prisma.matchHistory.create({ data: { puuid: puuid, matches: match_history } })
    return match_history


}
export async function get_match_by_matchId(large_region: string = '', id: string = '') {
    return 'match 1'
}

async function request_riot<T>(url: string, params: { [name: string]: any } = {}): Promise<T> {
    console.log(`riot request:${url} params:${Object.entries(params)}`)
    var oldest = await prisma.ratelimit.findFirst({ orderBy: { date: 'desc' } });
    if (oldest == null) {
        await prisma.ratelimit.create({ data: { type: 'total' } });
        var oldest = await prisma.ratelimit.findFirst({ orderBy: { date: 'desc' } });

    }
    while ((Date.now() - oldest!.date.getTime()) / 1000 > 120) {
        if ((await prisma.ratelimit.count()) < 100) {
            await prisma.ratelimit.create({ data: { type: 'total' } });
            break;
        }
        oldest = await prisma.ratelimit.findFirstOrThrow({ orderBy: { date: 'desc' } });

        if ((Date.now() - oldest.date.getTime()) / 1000 > 120) {
            await prisma.ratelimit.delete({ where: { id: oldest.id } });
            await prisma.ratelimit.create({ data: { type: 'total' } });
            break;
        }
        console.log(`Riot api being ratelimited locally TIMEOUT:${3 * (Date.now() - oldest.date.getTime())} url:${url}`);
    }

    params['api_key'] = process.env.RIOT_KEY;
    const response = await fetch('https://' + url + '?' + new URLSearchParams(params), {
        next: { revalidate: 10 },
    });
    // console.log("FORMAT URL", "https://" + url + "?" + new URLSearchParams(params))
    if (!response.ok) {
        if (response.status == 403) {
            throw new Error(`Request_riot failed with status code ${response.status}. Riot api key is probably at fault.url ${url}`);
        }
        {
            throw new Error(`Request_riot failed with status code ${response.status} url ${url}`);
        }
    }

    return await response.json();
}

export async function get_mastery_by_puuid(region: string = '', puuid: string = '') {
    if (!region || !puuid) {
        throw Error(`MATCHHISTORY. Region${region}  or puuid${puuid} does not exist.`);
    }
    const region_format = Object.keys(RegionNames)[Object.values(RegionNames).indexOf(region)];
    const url = `${region_format}.${process.env.RIOT_URL}champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
    var masteries = await request_riot<Mastery[]>(url, {});
    // masteries.forEach(async mastery => {
    //     await prisma.mastery.upsert({ where: { puuid_championId: { championId: mastery.championId, puuid: mastery.puuid } }, update: mastery, create: mastery })
    // });
    return masteries


}