'use client';
// import MatchHistoryDisplay from '@/app/components/MatchHistoryDisplay';
import React, { Children, Suspense } from 'react';

export default async function LargeDisplay({
  large_region,
  puuid,
  region,
  children,
}: {
  large_region: string;
  region: string;
  puuid: string;
  children: React.ReactNode;
}) {
  var tabs: Record<string, React.ReactNode> = {};
  const [page, setPage] = React.useState('MatchHistoryDisplay');
  Children.map(children, (child) => {
    return console.log(child);
  });
  return (
    <div className=" flex flex-col justify-center backdrop-brightness-75">
      {/* {children.map((child: React.ReactElement) => ({ child }))} */}
      <div>children {children}</div>
    </div>
  );
}
