import { get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function MatchHistoryDisplay({ large_region, puuid }: { large_region: string; puuid: string }) {
  var match_history = await get_matchhistory_by_puuid(large_region, puuid);
  return (
    <div className="flex-col">
      <p>match hhistory</p>
      {match_history.map((matchId: string) => (
        <Suspense key={'match:' + matchId} fallback={<div>Match loading...</div>}>
          {/* @ts-expect-error Server Component */}
          <MatchDisplay large_region={large_region} id={matchId} />
        </Suspense>
      ))}
    </div>
  );

  async function MatchDisplay({ large_region, id }: { large_region: string; id: string }) {
    // var match = await get_match_by_matchId(large_region, id);
    return (
      <div>
        <p>This is a match id:{id}</p>
        {/* <p>{match}</p> */}
      </div>
    );
  }
}
