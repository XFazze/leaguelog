// 'use client';
import { get_ranks_by_summonerId } from '@/lib/riotApi';
// import { Rank } from '@prisma/client';
import React, { Suspense } from 'react';

export default async function LargeDisplay({ children }: { children: React.ReactNode }) {
  // const [page, setPage] = React.useState('MatchHistoryDisplay');
  if (!children) {
    children = [];
  }
  console.log(children);
  return (
    <div className=" flex flex-col justify-center backdrop-brightness-75">
      {/* {children.map((child: React.ReactElement) => ({ child }))} */}
      {children}
    </div>
  );
}
