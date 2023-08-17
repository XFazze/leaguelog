import { get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import { Suspense } from 'react';
import { Meta, KDA, Champion, Gold, Items, Runes, Augments, CSVision, TeamSmall } from './PlayerMatch';
import { TeamPostistions } from '@/lib/gameConstants';
import { Match, MatchPlayer } from '@prisma/client';

export default async function MatchHistoryDisplay({ large_region, puuid }: { large_region: string; puuid: string }) {
  var match_history = await get_matchhistory_by_puuid(large_region, puuid);
  match_history.matches = match_history.matches.slice(0, 20);
  return (
    <div className="flex flex-col gap-4">
      {match_history.matches.map((matchId: string) => (
        <Suspense key={'match:' + matchId} fallback={<div>Match loading...</div>}>
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
      <div
        className={`grid grid-cols-[100px_100px_80px_100px_90px_110px_110px_110px] auto-cols-min ${background_color} rounded-sm`}
      >
        <Meta match={match} curret_player_match={curret_player_match}></Meta>
        <KDA match={match} curret_player_match={curret_player_match}></KDA>
        <Suspense fallback={<p>Summoner spells</p>}>
          {/* @ts-expect-error Server Component */}
          <Champion curret_player_match={curret_player_match}></Champion>
        </Suspense>
        <Suspense fallback={<p>Items...</p>}>
          {/* @ts-expect-error Server Component */}
          <Items curret_player_match={curret_player_match}></Items>
        </Suspense>
        <Gold curret_player_match={curret_player_match} enemy_lane={enemy_lane}></Gold>
        <div>
          <Suspense fallback={<p>Runes...</p>}>
            {/* @ts-expect-error Server Component */}
            <Runes curret_player_match={curret_player_match}></Runes>
          </Suspense>
          <Suspense fallback={<p>Runes...</p>}>
            {/* @ts-expect-error Server Component */}
            <Augments curret_player_match={curret_player_match}></Augments>
          </Suspense>
        </div>
        <CSVision curret_player_match={curret_player_match} match={match}></CSVision>
        <TeamSmall curret_player_match={curret_player_match} match={match}></TeamSmall>
      </div>
    );
  }
}
