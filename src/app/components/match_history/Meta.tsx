import { QueueTypeConverter } from '@/lib/gameConstants';
import { get_match_by_matchId, get_matchhistory_by_puuid } from '@/lib/riotApi';
import { Match, MatchPlayer } from '@prisma/client';

function format_date(time_in_milliseconds: bigint): string {
  var date = new Date(Number(time_in_milliseconds));
  if (new Date().getTime() - date.getTime() < 1000 * 60 * 60 * 60) {
    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60)).toString() + 'h ago';
  } else {
    return Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)).toString() + 'd ago';
  }
}
export default function Meta({ match, curret_player_match }: { match: Match; curret_player_match: MatchPlayer }) {
  return (
    <div className="flex flex-row justify-center items-center whitespace-nowrap gap-4">
      <div className="flex flex-col text-center ">
        <p className="text-sm">{QueueTypeConverter[match.queueId]}</p>
        {/* <p>Avg rank</p> */}
      </div>
      <div className="flex flex-col text-center ">
        <p>{format_date(match.gameCreation)}</p>
        <div>
          <p>{Math.floor(match.gameDuration / 6) / 10}m</p>
          {/* <p>{curret_player_match.win ? 'Win' : 'Loss'}</p> */}
        </div>
      </div>
    </div>
  );
}
