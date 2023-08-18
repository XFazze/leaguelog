import { RegionNames } from './gameConstants';
import { Rank, User, Mastery, MatchHistory } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ratelimitSmall, ratelimitLarge } from '@/lib/ratelimit';
import { delay } from '@/lib/base';

export async function get_user_by_username(region: string = '', username: string = ''): Promise<User | null> {
  const region_format = RegionNames[region];
  const url = `${region_format}.${process.env.RIOT_URL}summoner/v4/summoners/by-name/${username}`;
  var user = await prisma.user.findFirst({ where: { name: username } });
  if (user == null || (Date.now() - user.updatedAt.getTime()) / 1000 > +(process.env.USER_CACHE_IN_SECONDS || 30)) {
    user = await request_riot<User>('user', url);
  }
  if (user != null) {
    await prisma.user.upsert({
      where: { accountId: user.accountId },
      update: user,
      create: user,
    });
    user.updatedAt = new Date();
  }
  return user;
}

export async function get_ranks_by_summonerId(region: string = '', summonerId: string = ''): Promise<Rank[]> {
  var latest_ranks = await prisma.rank.findMany({
    where: { summonerId: summonerId },
    distinct: ['queueType'],
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (
    latest_ranks.length !== 0 &&
    (Date.now() - latest_ranks[0].createdAt.getTime()) / 1000 < +(process.env.RANK_CACHE_IN_SECONDS || 30)
  ) {
    return latest_ranks;
  }

  const region_format = RegionNames[region];
  const url = `${region_format}.${process.env.RIOT_URL}league/v4/entries/by-summoner/${summonerId}`;

  var ranks = await request_riot<Rank[]>('rank', url);
  if (ranks == null) {
    return [];
  }
  ranks.forEach(async (rank) => {
    await prisma.rank.create({ data: rank });
  });

  return ranks;
}

export async function get_matchhistory_by_puuid(large_region: string = '', puuid: string = ''): Promise<MatchHistory> {
  const url = `${large_region}.${process.env.RIOT_URL}match/v5/matches/by-puuid/${puuid}/ids`;
  var match_history_array: string[] = [];
  var latest_downloaded_match_array: string[] = [];
  var latest_downloaded_match = await prisma.matchHistory.findFirst({ where: { puuid: puuid } });
  if (
    latest_downloaded_match != null &&
    (Date.now() - latest_downloaded_match.updatedAt.getTime()) / 1000 <
      +(process.env.MATCH_HISTORY_CACHE_IN_SECONDS || 30)
  ) {
    return latest_downloaded_match;
  } else if (latest_downloaded_match === null) {
    latest_downloaded_match_array = [];
  } else if (latest_downloaded_match !== null) {
    latest_downloaded_match_array = latest_downloaded_match.matches;
  }
  var index = 0;
  while (true) {
    let match_history_100 = await request_riot<string[]>('match_history', url, {
      start: (index * 100).toString(),
      count: '100',
    });
    if (match_history_100 == null) {
      break;
    }

    if (
      latest_downloaded_match_array.length !== 0 &&
      latest_downloaded_match_array.some((id) => match_history_100?.includes(id))
    ) {
      match_history_array = [...new Set([...match_history_array, ...latest_downloaded_match_array])];
      break;
    }
    match_history_array = match_history_array.concat(match_history_100);
    index += 1;
    if (match_history_100.length != 100) {
      break;
    }
  }
  var match_history: MatchHistory = { puuid: puuid, matches: match_history_array, updatedAt: new Date() };
  await prisma.matchHistory.upsert({
    where: { puuid: puuid },
    update: match_history,
    create: match_history,
  });
  return match_history;
}

export async function get_match_by_matchId(large_region: string = '', id: string = '') {
  var match_prisma_query = { where: { matchId: id }, include: { matchPlayer: true } };
  var match_from_db = await prisma.match.findFirst(match_prisma_query);
  if (match_from_db !== null) {
    return match_from_db;
  }
  const url = `${large_region}.${process.env.RIOT_URL}match/v5/matches/${id}`;
  var match_from_api = await request_riot<any>('match', url, {});
  var match = await prisma.match.create({
    data: {
      matchId: match_from_api.metadata.matchId,
      participants: match_from_api.metadata.participants,
      gameCreation: match_from_api.info.gameCreation,
      gameDuration: match_from_api.info.gameDuration,
      gameEndTimestamp: match_from_api.info.gameEndTimestamp,
      gameId: match_from_api.info.gameId,
      gameMode: match_from_api.info.gameMode,
      gameName: match_from_api.info.gameName,
      gameStartTimestamp: match_from_api.info.gameStartTimestamp,
      gameType: match_from_api.info.gameType,
      gameVersion: match_from_api.info.gameVersion,
      mapId: match_from_api.info.mapId,
      platformId: match_from_api.info.platformId,
      queueId: match_from_api.info.queueId,
      tournamentCode: match_from_api.info.tournamentCode,
      team0BanChampionId: match_from_api.info.teams[0].bans.map(function (ban: any) {
        return ban.championId;
      }),
      team0BaronFirst: match_from_api.info.teams[0].objectives.baron.first,
      team0BaronKills: match_from_api.info.teams[0].objectives.baron.kills,
      team0ChampionsFirst: match_from_api.info.teams[0].objectives.champion.first,
      team0ChampionsKills: match_from_api.info.teams[0].objectives.champion.kills,
      team0DragonFirst: match_from_api.info.teams[0].objectives.dragon.first,
      team0DragonKills: match_from_api.info.teams[0].objectives.dragon.kills,
      team0InhibitorFirst: match_from_api.info.teams[0].objectives.inhibitor.first,
      team0InhibitorKills: match_from_api.info.teams[0].objectives.inhibitor.kills,
      team0RiftHeraldFirst: match_from_api.info.teams[0].objectives.riftHerald.first,
      team0RiftHeraldKills: match_from_api.info.teams[0].objectives.riftHerald.kills,
      team0TowerFirst: match_from_api.info.teams[0].objectives.tower.first,
      team0TowerKills: match_from_api.info.teams[0].objectives.tower.kills,
      team1BaronKills: match_from_api.info.teams[1].objectives.baron.kills,
      team1ChampionsKills: match_from_api.info.teams[1].objectives.champion.kills,
      team1DragonKills: match_from_api.info.teams[1].objectives.dragon.kills,
      team1InhibitorKills: match_from_api.info.teams[1].objectives.inhibitor.kills,
      team1RiftHeraldKills: match_from_api.info.teams[1].objectives.riftHerald.kills,
      team1TowerKills: match_from_api.info.teams[1].objectives.tower.kills,
      team1BanChampionId: match_from_api.info.teams[1].bans.map(function (ban: any) {
        return ban.championId;
      }),
      teamWinId: match_from_api.info.teams[0].win ? 0 : 1,
    },
  });
  for (let player_index = 0; player_index < match_from_api.metadata.participants.length; player_index++) {
    const puuid = match_from_api.metadata.participants[player_index];
    const player_data = match_from_api.info.participants[player_index];
    await prisma.matchPlayer.create({
      data: {
        match: { connect: { matchId: match_from_api.metadata.matchId } },
        puuid: puuid,
        queueId: match_from_api.info.queueId,
        playerNum: player_index,
        gameDuration: match_from_api.info.gameDuration,
        allInPings: player_data.allInPings,
        assistMePings: player_data.assistMePings,
        assists: player_data.assists,
        baitPings: player_data.baitPings,
        baronKills: player_data.baronKills,
        basicPings: player_data.basicPings,
        bountyLevel: player_data.bountyLevel,
        challenges: player_data.challenges,
        champExperience: player_data.champExperience,
        champLevel: player_data.champLevel,
        championId: player_data.championId,
        championName: player_data.championName,
        championTransform: player_data.championTransform,
        commandPings: player_data.commandPings,
        consumablesPurchased: player_data.consumablesPurchased,
        damageDealtToBuildings: player_data.damageDealtToBuildings,
        damageDealtToObjectives: player_data.damageDealtToObjectives,
        damageDealtToTurrets: player_data.damageDealtToTurrets,
        damageSelfMitigated: player_data.damageSelfMitigated,
        dangerPings: player_data.dangerPings,
        deaths: player_data.deaths,
        detectorWardsPlaced: player_data.detectorWardsPlaced,
        doubleKills: player_data.doubleKills,
        dragonKills: player_data.dragonKills,
        eligibleForProgression: player_data.eligibleForProgression,
        enemyMissingPings: player_data.enemyMissingPings,
        enemyVisionPings: player_data.enemyVisionPings,
        firstBloodAssist: player_data.firstBloodAssist,
        firstBloodKill: player_data.firstBloodKill,
        firstTowerAssist: player_data.firstTowerAssist,
        firstTowerKill: player_data.firstTowerKill,
        gameEndedInEarlySurrender: player_data.gameEndedInEarlySurrender,
        gameEndedInSurrender: player_data.gameEndedInSurrender,
        getBackPings: player_data.getBackPings,
        goldEarned: player_data.goldEarned,
        goldSpent: player_data.goldSpent,
        holdPings: player_data.holdPings,
        individualPosition: player_data.individualPosition,
        inhibitorKills: player_data.inhibitorKills,
        inhibitorTakedowns: player_data.inhibitorTakedowns,
        inhibitorsLost: player_data.inhibitorsLost,
        item0: player_data.item0,
        item1: player_data.item1,
        item2: player_data.item2,
        item3: player_data.item3,
        item4: player_data.item4,
        item5: player_data.item5,
        item6: player_data.item6,
        itemsPurchased: player_data.itemsPurchased,
        killingSprees: player_data.killingSprees,
        kills: player_data.kills,
        lane: player_data.lane,
        largestCriticalStrike: player_data.largestCriticalStrike,
        largestKillingSpree: player_data.largestKillingSpree,
        largestMultiKill: player_data.largestMultiKill,
        longestTimeSpentLiving: player_data.longestTimeSpentLiving,
        magicDamageDealt: player_data.magicDamageDealt,
        magicDamageDealtToChampions: player_data.magicDamageDealtToChampions,
        magicDamageTaken: player_data.magicDamageTaken,
        needVisionPings: player_data.needVisionPings,
        neutralMinionsKilled: player_data.neutralMinionsKilled,
        nexusKills: player_data.nexusKills,
        nexusLost: player_data.nexusLost,
        nexusTakedowns: player_data.nexusTakedowns,
        objectivesStolen: player_data.objectivesStolen,
        objectivesStolenAssists: player_data.objectivesStolenAssists,
        onMyWayPings: player_data.onMyWayPings,
        participantId: player_data.participantId,
        pentaKills: player_data.pentaKills,
        runePrimary1: player_data.perks.styles[0].selections[0].perk,
        runePrimary2: player_data.perks.styles[0].selections[1].perk,
        runePrimary3: player_data.perks.styles[0].selections[2].perk,
        runePrimary4: player_data.perks.styles[0].selections[3].perk,
        runeSecondary1: player_data.perks.styles[1].selections[0].perk,
        runeSecondary2: player_data.perks.styles[1].selections[1].perk,
        runeStatFlex: player_data.perks.statPerks.flex,
        runeStatdefense: player_data.perks.statPerks.defense,
        runeStatOffenes: player_data.perks.statPerks.offense,
        physicalDamageDealt: player_data.physicalDamageDealt,
        physicalDamageDealtToChampions: player_data.physicalDamageDealtToChampions,
        physicalDamageTaken: player_data.physicalDamageTaken,
        placement: player_data.placement,
        playerAugment1: player_data.playerAugment1,
        playerAugment2: player_data.playerAugment2,
        playerAugment3: player_data.playerAugment3,
        playerAugment4: player_data.playerAugment4,
        playerSubteamId: player_data.playerSubteamId,
        profileIcon: player_data.profileIcon,
        pushPings: player_data.pushPings,
        quadraKills: player_data.quadraKills,
        riotIdName: player_data.riotIdName,
        riotIdTagline: player_data.riotIdTagline,
        role: player_data.role,
        sightWardsBoughtInGame: player_data.sightWardsBoughtInGame,
        spell1Casts: player_data.spell1Casts,
        spell2Casts: player_data.spell2Casts,
        spell3Casts: player_data.spell3Casts,
        spell4Casts: player_data.spell4Casts,
        subteamPlacement: player_data.subteamPlacement,
        summoner1Casts: player_data.summoner1Casts,
        summoner1Id: player_data.summoner1Id,
        summoner2Casts: player_data.summoner2Casts,
        summoner2Id: player_data.summoner2Id,
        summonerId: player_data.summonerId,
        summonerLevel: player_data.summonerLevel,
        summonerName: player_data.summonerName,
        teamEarlySurrendered: player_data.teamEarlySurrendered,
        teamId: player_data.teamId,
        teamPosition: player_data.teamPosition,
        timeCCingOthers: player_data.timeCCingOthers,
        timePlayed: player_data.timePlayed,
        totalAllyJungleMinionsKilled: player_data.totalAllyJungleMinionsKilled,
        totalDamageDealt: player_data.totalDamageDealt,
        totalDamageDealtToChampions: player_data.totalDamageDealtToChampions,
        totalDamageShieldedOnTeammates: player_data.totalDamageShieldedOnTeammates,
        totalDamageTaken: player_data.totalDamageTaken,
        totalEnemyJungleMinionsKilled: player_data.totalEnemyJungleMinionsKilled,
        totalHeal: player_data.totalHeal,
        totalHealsOnTeammates: player_data.totalHealsOnTeammates,
        totalMinionsKilled: player_data.totalMinionsKilled,
        totalTimeCCDealt: player_data.totalTimeCCDealt,
        totalTimeSpentDead: player_data.totalTimeSpentDead,
        totalUnitsHealed: player_data.totalUnitsHealed,
        tripleKills: player_data.tripleKills,
        trueDamageDealt: player_data.trueDamageDealt,
        trueDamageDealtToChampions: player_data.trueDamageDealtToChampions,
        trueDamageTaken: player_data.trueDamageTaken,
        turretKills: player_data.turretKills,
        turretTakedowns: player_data.turretTakedowns,
        turretsLost: player_data.turretsLost,
        unrealKills: player_data.unrealKills,
        visionClearedPings: player_data.visionClearedPings,
        visionScore: player_data.visionScore,
        visionWardsBoughtInGame: player_data.visionWardsBoughtInGame,
        wardsKilled: player_data.wardsKilled,
        wardsPlaced: player_data.wardsPlaced,
        win: player_data.win,
      },
    });
  }

  match_from_db = await prisma.match.findFirst(match_prisma_query);
  return match_from_db;
}

export async function get_mastery_by_puuid(region: string = '', puuid: string = '') {
  const region_format = RegionNames[region];
  const url = `${region_format}.${process.env.RIOT_URL}champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;
  var masteries = await request_riot<Mastery[]>('mastery', url, {});
  // masteries.forEach(async mastery => {
  //     await prisma.mastery.upsert({ where: { puuid_championId: { championId: mastery.championId, puuid: mastery.puuid } }, update: mastery, create: mastery })
  // });
  return masteries;
}
async function request_riot<T>(type: string, url: string, params: { [name: string]: any } = {}): Promise<T | null> {
  console.log(`riot request:${url} params:${Object.entries(params)}`);

  console.log('waiting for small', type);
  await ratelimitSmall.wait_for_turn();
  console.log('waiting for large', type);
  await ratelimitLarge.wait_for_turn();
  console.log('released', type);
  params['api_key'] = process.env.RIOT_KEY;
  const response = await fetch('https://' + url + '?' + new URLSearchParams(params), {
    next: { revalidate: 10 },
  });
  // console.log("FORMAT URL", "https://" + url + "?" + new URLSearchParams(params))
  if (!response.ok) {
    if (response.status == 403) {
      throw new Error(
        `Request_riot failed with status code ${response.status}. Riot api key is probably at fault.url ${url}`
      );
    } else if (response.status == 404) {
      return null;
    }
    {
      throw new Error(`Request_riot failed with status code ${response.status} url ${url}`);
    }
  }

  return await response.json();
}
