import UserDisplay from '@/app/components/user_display';
import { get_user_by_username } from '@/lib/riotApi';
import { User } from '@prisma/client';
import { Suspense } from 'react';

export default async function page({
  params,
  searchParams,
}: {
  params: { region: string; username: string };
  searchParams: {};
}) {
  const user: User = await get_user_by_username(params.region, decodeURIComponent(params.username));
  // const matchHistory: MatchHistory = await get_match_history_by_puuid(params.region, user.puuid);
  return (
    <div className="flex-row">
      <Suspense fallback={<div>Profile loading...</div>}>
        <UserDisplay user={user} />
      </Suspense>
      {/* <Suspense fallback={<div>Match history...</div>}>
        <MatchHistoryDisplay user={user} />
      </Suspense> */}
    </div>
  );
}
