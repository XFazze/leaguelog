// import MatchHistoryDisplay from '@/app/components/MatchHistoryDisplay';
import React, { Children, Suspense } from 'react';
import MatchHistoryDisplay from './MatchHistoryDisplay';

export default function LargeDisplay({
  large_region,
  puuid,
  region,
}: {
  large_region: string;
  region: string;
  puuid: string;
}) {
  // var tabs: Record<string, React.ReactNode> = {};
  // const [page, setPage] = React.useState('MatchHistoryDisplay');
  // Children.map(children, (child) => {
  //   return console.log(child);
  // });
  return (
    <div className=" flex flex-col justify-top backdrop-brightness-75 p-2 self-start">
      {/* {children.map((child: React.ReactElement) => ({ child }))} */}
      <Suspense fallback={<div>Match history loading...</div>}>
        {/* @ts-expect-error Server Component */}
        <MatchHistoryDisplay large_region={large_region} puuid={puuid}></MatchHistoryDisplay>
      </Suspense>
      {/* <MasteryDisplay region={params.region} puuid={user.puuid}></MasteryDisplay> */}
    </div>
  );
}
