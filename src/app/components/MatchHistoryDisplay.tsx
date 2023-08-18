import { get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import { Suspense } from 'react';
import { LargeMatch, SmallMatch } from './MatchDisplay';
import React from 'react';
import MatchControl from './MatchControl';

export default async function MatchHistoryDisplay({ large_region, puuid }: { large_region: string; puuid: string }) {
  var match_history = await get_matchhistory_by_puuid(large_region, puuid);
  match_history.matches = match_history.matches.slice(0, 20);
  return (
    <div className="flex flex-col gap-4">
      {match_history.matches.map((matchId: string) => (
        <Suspense key={'match:' + matchId} fallback={<div className="h-12">Match loading...</div>}>
          {/* @ts-expect-error Server Component */}
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
    var curret_player_match = match.matchPlayer.find((player) => player.puuid === puuid)!;
    var enemy_lane =
      match.matchPlayer.find(
        (player) => player.teamPosition === curret_player_match.teamPosition && player.puuid !== puuid
      ) || null;
    var background_color = curret_player_match.win ? 'bg-green-800' : 'bg-red-800';

    return (
      <div className="flex flex-col justify-center text-center gap-2">
        <div className={`flex flex-row ${background_color}`}>
          <MatchControl matchId={match.matchId}>
            <SmallMatch curret_player_match={curret_player_match} match={match} enemy_lane={enemy_lane} />
          </MatchControl>
        </div>
        <LargeMatch curret_player_match={curret_player_match} match={match} />
      </div>
    );
  }
}
