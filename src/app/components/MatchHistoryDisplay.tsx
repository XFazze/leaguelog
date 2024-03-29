import { get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import { Suspense } from 'react';
import { LargeMatch, SmallMatch } from './MatchDisplay';
import React from 'react';
import MatchControl from './MatchControl';

export default async function MatchHistoryDisplay({ large_region, puuid }: { large_region: string; puuid: string }) {
  var match_history = await get_matchhistory_by_puuid(large_region, puuid);
  match_history.matches = match_history.matches.slice(0, 10);
  return (
    <div className="flex flex-col gap-4">
      {match_history.matches.map((matchId: string) => (
        <Suspense key={'match:' + matchId} fallback={<div className="h-12">Match loading...</div>}>
          <MatchDisplay large_region={large_region} id={matchId} puuid={puuid} />
        </Suspense>
      ))}
    </div>
  );

  async function MatchDisplay({ large_region, id, puuid }: { large_region: string; id: string; puuid: string }) {
    var match = await get_match_by_matchId(large_region, id);
    if (match === null) {
      return (
        <div>
          <p>This match is broken id:{id}</p>
        </div>
      );
    }
    var curret_player_match = match.matchPlayer.find((player: any) => player.puuid === puuid)!;
    var enemy_lane =
      match.matchPlayer.find(
        (player: any) => player.teamPosition === curret_player_match.teamPosition && player.puuid !== puuid
      ) || null;

    return (
      <div className="flex flex-col justify-center text-center gap-2  ">
        <div className={`flex flex-row backdrop-brightness-75 p-1 rounded-sm`}>
          <MatchControl matchId={match.matchId}>
            <SmallMatch curret_player_match={curret_player_match} match={match} enemy_lane={enemy_lane} />
          </MatchControl>
        </div>
        <LargeMatch curret_player_match={curret_player_match} match={match} />
      </div>
    );
  }
}
