import { get_mastery_by_puuid, get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import { Mastery } from '@prisma/client';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function MasteryDisplay({ region, puuid }: { region: string; puuid: string }) {
  var masteries = await get_mastery_by_puuid(region, puuid);
  return (
    <div className="flex-col">
      <p>Masteries</p>
      <div></div>
      {/* {masteries.map((mastery: Mastery) => ( */}
      {/* <div key={mastery.championId}>{mastery.championId}</div> */}
      {/* ))} */}
    </div>
  );
}
