import { get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import { Suspense } from 'react';
import Meta from '@/app/components/match_history/Meta';
import Champ from './match_history/Champ';

export default async function MatchHistoryDisplay({ large_region, puuid }: { large_region: string; puuid: string }) {
  var match_history = await get_matchhistory_by_puuid(large_region, puuid);
  match_history.matches = match_history.matches.slice(0, 20);
  return (
    <div className="flex flex-col gap-1">
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
    var background_color = curret_player_match.win ? 'bg-green-800' : 'bg-red-800';
    return (
      <div className={`flex flex-row ${background_color} gap-8 min-h-min p-2 rounded-sm`}>
        <Meta match={match} curret_player_match={curret_player_match}></Meta>
        <div className="flex flex-col text-center  justify-center">
          <p>
            {curret_player_match.kills}/{curret_player_match.deaths}/{curret_player_match.assists}(
            {Math.floor((10 * (curret_player_match.assists + curret_player_match.kills)) / curret_player_match.deaths) /
              10}
            )
          </p>
          <p>
            {Math.floor(
              ((curret_player_match.kills + curret_player_match.assists) /
                (curret_player_match.teamId === 0 ? match.team0ChampionsKills : match.team1ChampionsKills)) *
                10
            ) / 10}
            kp
          </p>
        </div>
        <Suspense fallback={<p>Summoner spells</p>}>
          {/* @ts-expect-error Server Component */}
          <Champ player_match={curret_player_match}></Champ>
        </Suspense>

        <div className="flex flex-col text-center">
          <p>
            {curret_player_match.totalMinionsKilled}cs(
            {Math.floor(curret_player_match.visionScore / (match.gameDuration / 6)) / 10}
            cs/m)
          </p>
          <p>{curret_player_match.visionScore} vision score</p>
        </div>
      </div>
    );
  }
}
