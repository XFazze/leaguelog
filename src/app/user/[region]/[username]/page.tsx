import { LargeRegionsConverter } from '@/lib/gameConstants';
import RanksDisplay from '@/app/components/RanksDisplay';
import UserDisplay from '@/app/components/UserDisplay';
import { get_user_by_username } from '@/lib/riotApi';
import { Suspense } from 'react';
import LargeDisplay from '@/app/components/LargeDisplay';
import { ChampionsStatistics } from '@/app/components/SideStatistics';

export default async function page({
  params,
  searchParams,
}: {
  params: { region: string; username: string };
  searchParams: {};
}) {
  // prisma.$connect();
  const user = await get_user_by_username(params.region, decodeURIComponent(params.username));
  if (user === null) {
    return (
      <div>
        <p>
          User {params.username} doesnt exist on region {params.region}
        </p>
      </div>
    );
  }
  var large_region = LargeRegionsConverter[params.region];
  return (
    <div className="flex flex-row gap-8 justify-center">
      <div className="grid grid-cols-1 gap-4 auto-rows-min">
        <div className="flex flex-row  gap-4 backdrop-brightness-75  rounded-md self-start">
          <Suspense fallback={<div>Profile loading...</div>}>
            <UserDisplay user={user} />
          </Suspense>
          <Suspense fallback={<div>Ranks loading...</div>}>
            <RanksDisplay region={params.region} id={user.id} />
          </Suspense>
        </div>
        <Suspense fallback={<div>Ranks loading...</div>}>
          <ChampionsStatistics puuid={user.puuid} />
        </Suspense>
      </div>
      <LargeDisplay large_region={large_region} region={params.region} puuid={user.puuid} />
    </div>
  );
}
