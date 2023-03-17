import { RegionNames } from './gameConstants';
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { User } from '@prisma/client';
import { prisma } from '@/lib/prisma';


export async function get_user_by_username(region: string = '', username: string = ''): Promise<User> {
    if (!region || !username) {
        throw Error('Regrion or username does not exist.');
    }

    const region_format = Object.keys(RegionNames)[Object.values(RegionNames).indexOf(region)];
    const url = `${region_format}.${process.env.RIOT_URL}summoner/v4/summoners/by-name/${username}`;
    var user = await prisma.user.findFirst({ where: { name: username } })
    if (user != null) {
        if ((Date.now() - user.updatedAt.getTime()) / 1000 > 30) { // seconds
            user = await request_riot<User>(url)
        } else {
            user = await request_riot<User>(url)
        }
    } else {
        user = await request_riot<User>(url)

    }
    await prisma.user.upsert({
        where: { accountId: user.accountId },
        update: user,
        create: user
    })
    return user
}
// async function get_match_history_by_puuid(region: string = '', puuid: string = ''): Promise<MatchHistory> {
//     if (!region || !puuid) {
//         throw Error('Regrion or username does not exist.');
//     }
// }

async function request_riot<T>(url: string, params: { [name: string]: any } = {}): Promise<T> {
    while (true) {
        if (await prisma.ratelimit.count() < 100) {
            await prisma.ratelimit.create({ data: { type: 'total' } })
            break;
        }
        var oldest = await prisma.ratelimit.findFirstOrThrow({ orderBy: { date: 'desc' } })

        if ((Date.now() - oldest.date.getTime()) / 1000 > 120) {
            await prisma.ratelimit.delete({ where: { id: oldest.id } })
            await prisma.ratelimit.create({ data: { type: 'total' } })
            break;

        }
        console.log('Riot api being ratelimited')
        setTimeout(() => {
        }, Date.now() - oldest.date.getTime());


    }
    params['api_key'] = process.env.RIOT_KEY;
    const response = await fetch('https://' + url + '?' + new URLSearchParams(params), {
        next: { revalidate: 10 },
        cache: 'no-store',
    });
    // console.log("FORMAT URL", "https://" + url + "?" + new URLSearchParams(params))
    if (!response.ok) {
        if (response.status == 403) {
            throw new Error(`Request_riot failed with status code ${response.status}. Riot api key is probably at fault.`);
        }
        {
            throw new Error(`Request_riot failed with status code ${response.status}`);
        }
    }

    return await response.json();
}
