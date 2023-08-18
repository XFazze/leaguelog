import { prisma } from '@/lib/prisma';
import { get_ranks_by_summonerId } from '@/lib/riotApi';
import { Rank } from '@prisma/client';
import { match } from 'assert';
import { Suspense } from 'react';
import { Icon } from './MatchDisplay';

type combination = {
  championId: number;
  queueId: number;
  total: number;
  losses: number;
  totalMinionsKilled: number;
  kills: number;
  deaths: number;
  assists: number;
  gameDuration_in_m: number;
  goldEarned: number;
  totalDamageDealtToChampions: number;
};
export async function ChampionsStatistics({ puuid }: { puuid: string }) {
  // Champ, gamemode, w/l, cs, k/d/a
  var combinations = await prisma.matchPlayer.groupBy({
    where: { puuid: puuid },
    by: ['championId', 'queueId'],
    _count: { _all: true },
    _avg: {
      kills: true,
      deaths: true,
      assists: true,
      totalMinionsKilled: true,
      gameDuration: true,
      goldEarned: true,
      totalDamageDealtToChampions: true,
    },
  });
  var lost_combinations = await prisma.matchPlayer.groupBy({
    where: { puuid: puuid, win: false },
    by: ['championId', 'queueId'],
    _count: { _all: true },
  });
  var formatted_combinations: combination[] = [];
  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];

    formatted_combinations.push({
      championId: Math.floor(combination.championId),
      queueId: combination.queueId,
      total: combination._count._all,
      losses:
        lost_combinations.find(
          (lost_copmbination) =>
            lost_copmbination.championId === combination.championId && lost_copmbination.queueId === combination.queueId
        )?._count._all || 0,
      totalMinionsKilled: Math.floor(combination._avg.totalMinionsKilled || 0),
      kills: Math.floor(combination._avg.kills || 0),
      deaths: Math.floor(combination._avg.deaths || 0),
      assists: Math.floor(combination._avg.assists || 0),
      gameDuration_in_m: Math.floor(combination._avg.gameDuration || 0 / 6) / 10,
      goldEarned: Math.floor(combination._avg.goldEarned || 0),
      totalDamageDealtToChampions: Math.floor(combination._avg.totalDamageDealtToChampions || 0),
    });
  }
  return (
    <div className=" flex flex-col gap-2  backdrop-brightness-75 p-2 justify-center rounded-md self-start">
      {formatted_combinations.map((formatted_combination: combination) => (
        <Suspense
          key={formatted_combination.championId * formatted_combination.queueId}
          fallback={<div className="h-12">Champion loading...</div>}
        >
          <ChampionStatistics formatted_combination={formatted_combination} />
        </Suspense>
      ))}
    </div>
  );

  function ChampionStatistics({ formatted_combination }: { formatted_combination: combination }) {
    return (
      <div className="grid grid-cols-[52px_44px_44px_40px_60px_60px] [&>*]:flex [&>*]:flex-col [&>*]:justify-center  [&>*]: items-center [&>*]:text-center ps-2 first:pt-2 last:pb-2 backdrop-brightness-90">
        <div className="scale-90 overflow-hidden w-12 ">
          <Icon
            url={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${formatted_combination.championId}.png`}
            size={48}
            alt="Champion icon"
            classes="rounded-lg scale-110"
          ></Icon>
        </div>
        <div>
          <p>
            {formatted_combination.total - formatted_combination.losses}w/{formatted_combination.losses}l
          </p>
          <p>
            {Math.floor(
              ((formatted_combination.total - formatted_combination.losses) * 100) / formatted_combination.total
            )}
            %
          </p>
        </div>
        <div>
          <p>
            {formatted_combination.kills}/{formatted_combination.deaths}/{formatted_combination.assists}
          </p>
          <p>
            {Math.floor(
              (10 * (formatted_combination.assists + formatted_combination.kills)) / formatted_combination.deaths
            ) / 10}
            kda
          </p>
        </div>
        <div>
          <p>{formatted_combination.totalMinionsKilled}cs</p>
          <p>
            {Math.floor((10 * formatted_combination.totalMinionsKilled) / formatted_combination.gameDuration_in_m) / 10}
            cs/m
          </p>
        </div>
        <div>
          <p>{Math.floor(formatted_combination.goldEarned / 1000)}k gold</p>
          <p>
            {Math.floor(formatted_combination.goldEarned / formatted_combination.gameDuration_in_m)}
            k/m
          </p>
        </div>
        <div>
          <p>{Math.floor(formatted_combination.totalDamageDealtToChampions / 1000)}k dmg</p>
          <p>
            {Math.floor(
              formatted_combination.totalDamageDealtToChampions / 10 / formatted_combination.gameDuration_in_m
            ) / 10}
            k/m
          </p>
        </div>
      </div>
    );
  }
}
