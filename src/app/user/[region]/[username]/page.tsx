import UserDisplay from '@/app/components/user_display';
import { get_user_by_username, UserResponse } from '@/lib/riot_api';
import { Suspense } from 'react';

export default async function page({
  params,
  searchParams,
}: {
  params: { region: string; username: string };
  searchParams: {};
}) {
  const user: UserResponse = await get_user_by_username(params.region, params.username);
  return (
    <div>
      <UserDisplay user={user} />
      {/* <Suspense fallback={<div>Loading...</div>}></Suspense> */}
    </div>
  );
}
