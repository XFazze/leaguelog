import MatchHistoryDisplay from '@/app/components/MatchHistoryDisplay';
import { LargeRegionsConverter } from '@/lib/gameConstants';
import RanksDisplay from '@/app/components/RanksDisplay';
import UserDisplay from '@/app/components/UserDisplay';
import { prisma } from '@/lib/prisma';
import { get_user_by_username } from '@/lib/riotApi';
import { Rank, User } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LargeDisplay from '@/app/components/LargeDisplay';

export default async function page({
  params,
  searchParams,
}: {
  params: { region: string; username: string };
  searchParams: {};
}) {
  const user = await get_user_by_username(params.region, decodeURIComponent(params.username));
  if (!user) {
    <div>
      <p>
        User {params.username} doesnt exist on region {params.region}
      </p>
    </div>;
  }
  var large_region = LargeRegionsConverter[params.region];
  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-row justify-center gap-4 backdrop-brightness-75 p-1 rounded-md">
        <Suspense fallback={<div>Profile loading...</div>}>
          <UserDisplay user={user} />
        </Suspense>
        <Suspense fallback={<div>Ranks loading...</div>}>
          {/* @ts-expect-error Server Component */}
          <RanksDisplay region={params.region} id={user.id} />
        </Suspense>
      </div>
    </div>
  );
}
