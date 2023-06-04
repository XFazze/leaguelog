import { get_ranks_by_summonerId } from '@/lib/riotApi';
import { Rank } from '@prisma/client';

export default async function RanksDisplay({ region, id }: { region: string; id: string }) {
  const ranks: [Rank] = await get_ranks_by_summonerId(region, id);
  var solo, flex;
  ranks.forEach((rank) => {
    if (rank.queueType == 'RANKED_SOLO_5x5') {
      solo = rank;
    } else if (rank.queueType == 'RANKED_FLEX_SR') {
      flex = rank;
    }
  });
  return (
    <div className=" flex flex-col justify-center">
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
    return (
      <div>
        {rank !== null ? (
          <div>
            <p className="text-sm">{name}</p>
            <p>
              {rank.tier} {rank.rank} - {rank.leaguePoints}LP
            </p>
            <p>
              {rank.wins}w/{rank.losses}l - {Math.round((1000 * rank.wins) / (rank.wins + rank.losses)) / 10}%
            </p>
          </div>
        ) : (
          <p>No {name} rank</p>
        )}
      </div>
    );
  }
}
