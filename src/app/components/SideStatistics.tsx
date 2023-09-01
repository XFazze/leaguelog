// 'use server';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import { Icon } from './MatchDisplay';
import { ChampionsStatisticsControl } from './SideStatisticsControl';

type champion_statistics = {
  championId: number;
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
export async function ChampionsStatistics({
  puuid,
  queue_ids,
  queue_id_id,
}: {
  puuid: string;
  queue_ids: number[];
  queue_id_id: string;
}) {
  var combinations = await prisma.matchPlayer.groupBy({
    where: { puuid: puuid, queueId: { in: queue_ids } },
    by: ['championId'],
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
  var lost_champion_statistic = await prisma.matchPlayer.groupBy({
    where: { puuid: puuid, win: false, queueId: { in: queue_ids } },
    by: ['championId'],
    _count: { _all: true },
  });
  var formatted_champion_statistics: champion_statistics[] = [];
  for (let i = 0; i < combinations.length; i++) {
    const champion_statistic = combinations[i];

    formatted_champion_statistics.push({
      championId: Math.floor(champion_statistic.championId),
      total: champion_statistic._count._all,
      losses:
        lost_champion_statistic.find(
          (lost_champion_statistic) => lost_champion_statistic.championId === champion_statistic.championId
        )?._count._all || 0,
      totalMinionsKilled: Math.floor(champion_statistic._avg.totalMinionsKilled || 0),
      kills: Math.floor(champion_statistic._avg.kills || 0),
      deaths: Math.floor(champion_statistic._avg.deaths || 0),
      assists: Math.floor(champion_statistic._avg.assists || 0),
      gameDuration_in_m: Math.floor((champion_statistic._avg.gameDuration || 0) / 6) / 10,
      goldEarned: Math.floor(champion_statistic._avg.goldEarned || 0),
      totalDamageDealtToChampions: Math.floor(champion_statistic._avg.totalDamageDealtToChampions || 0),
    });
  }
  return (
    <div
      id={`stats_queueId_${queue_id_id}`}
      className={`${
        queue_id_id === '420' ? 'flex' : 'hidden'
      } flex flex-col gap-2  p-2 justify-center rounded-sm self-start`}
    >
      {formatted_champion_statistics
        .sort(function (champion_1, champion_2) {
          return champion_2.total - champion_1.total;
        })
        .map((champion_statistic: champion_statistics) => (
          <Suspense key={champion_statistic.championId} fallback={<div className="h-12">Champion loading...</div>}>
            <ChampionStatistics formatted_combination={champion_statistic} />
          </Suspense>
        ))}
    </div>
  );

  function ChampionStatistics({ formatted_combination }: { formatted_combination: champion_statistics }) {
    return (
      <div
        className={` flex flex-row [&>*]:flex [&>*]:flex-col [&>*]:justify-center  [&>*]: items-center [&>*]:text-center rounded-md p-1 backdrop-brightness-75`}
      >
        <div className="scale-90 overflow-hidden w-12 ">
          <Icon
            url={`${process.env.RAW_COMMUNITY_URL}plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${formatted_combination.championId}.png`}
            size={48}
            alt="Champion icon"
            classes="rounded-lg scale-110"
          ></Icon>
        </div>
        <div className="w-16">
          <p>
            {formatted_combination.total - formatted_combination.losses}w/{formatted_combination.losses}l
          </p>
        </div>
        <div className="w-10">
          <p>
            {Math.floor(
              ((formatted_combination.total - formatted_combination.losses) * 100) / formatted_combination.total
            )}
            %
          </p>
        </div>
        <div className="w-14">
          <p>
            {formatted_combination.kills}/{formatted_combination.deaths}/{formatted_combination.assists}
          </p>
        </div>
        <div className="w-14">
          <p>
            {Math.floor((10 * formatted_combination.totalMinionsKilled) / formatted_combination.gameDuration_in_m) / 10}
            cs/m
          </p>
        </div>
        {/* <div>
          <p>
            {Math.floor(formatted_combination.goldEarned / formatted_combination.gameDuration_in_m)}
            k/m
          </p>
        </div>
        <div>
          <p>
            {Math.floor(
              formatted_combination.totalDamageDealtToChampions / 10 / formatted_combination.gameDuration_in_m
            ) / 10}
            k/m
          </p> 
        </div>*/}
      </div>
    );
  }
}
export async function SideStatistics({ puuid }: { puuid: string }) {
  return (
    <div className="p-2">
      <ChampionsStatisticsControl puuid={puuid}>
        <ChampionsStatistics puuid={puuid} queue_ids={[420]} queue_id_id="420"></ChampionsStatistics>
        <ChampionsStatistics puuid={puuid} queue_ids={[440]} queue_id_id="440"></ChampionsStatistics>
        <ChampionsStatistics puuid={puuid} queue_ids={[400, 420, 440, 700]} queue_id_id="0"></ChampionsStatistics>
      </ChampionsStatisticsControl>
    </div>
  );
}
