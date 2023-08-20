'use client';

import { useState } from 'react';

export default function MatchControl({ children, matchId }: { children: React.ReactNode; matchId: string }) {
  const [open, setOpen] = useState('');
  function open_match(matchId: string) {
    var large_display = document.getElementById(`Large_${matchId}`);
    if (large_display === null) {
      console.log('doesnt find element');
      return;
    } else if (open === matchId) {
      setOpen('');
      // close
      large_display.classList.add('hidden');
    } else {
      //open
      setOpen(matchId);
      large_display.classList.remove('hidden');
    }
  }
  return (
    <div className="divide-x divide-slate-400/25 flex flex-row">
      {children}
      <div className="flex justify-center pr-2">
        <button className={`text-white`} onClick={() => open_match(matchId)}>
          {open === matchId ? '↑' : '↓'}
        </button>
      </div>
    </div>
  );
}
