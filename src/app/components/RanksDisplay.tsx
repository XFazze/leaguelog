import { get_ranks_by_summonerId } from '@/lib/riotApi';
import { Rank } from '@prisma/client';

export default async function RanksDisplay({ region, id }: { region: string; id: string }) {
  const ranks: Rank[] = await get_ranks_by_summonerId(region, id);
  var solo = null;
  var flex = null;
  ranks.forEach((rank) => {
    if (rank.queueType == 'RANKED_SOLO_5x5') {
      solo = rank;
    } else if (rank.queueType == 'RANKED_FLEX_SR') {
      flex = rank;
    }
  });
  if (solo === null && flex === null) {
    <div></div>;
  }
  return (
    <div className=" flex flex-col p-2 m-2 backdrop-brightness-90 self-start ">
      <SingleRankDisplay rank={solo} name="Soloq" />
      <SingleRankDisplay rank={flex} name="Flex" />
    </div>
  );
  function SingleRankDisplay(props: any) {
    const rank = props.rank;
    const name = props.name;
    if (!rank) {
      return null;
    }
    let display_rank = 0;
    if (rank.rank == 'I') {
      display_rank = 1;
    } else if (rank.rank == 'II') {
      display_rank = 2;
    } else if (rank.rank == 'III') {
      display_rank = 3;
    } else if (rank.rank == 'IV') {
      display_rank = 4;
    }
    return (
      <div>
        {rank !== null ? (
          <div>
            <p>{name}</p>
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col content-around">
                <h1>
                  {rank.tier} {display_rank}
                </h1>
                <p>
                  {rank.wins}w/{rank.losses}l{' '}
                </p>
              </div>
              <div className="flex flex-col content-around">
                <p>{rank.leaguePoints}LP</p>
                <p> {Math.round((1000 * rank.wins) / (rank.wins + rank.losses)) / 10}%</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No {name} rank</p>
        )}
      </div>
    );
  }
}
