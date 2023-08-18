'use client';

import { useState } from 'react';

export default function MatchControl({ children, matchId }: { children: React.ReactNode; matchId: string }) {
  const [open, setOpen] = useState('');
  function open_match(matchId: string) {
    console.log('ww', matchId, open, `Large_${matchId}`);
    var large_display = document.getElementById(`Large_${matchId}`);
    if (large_display === null) {
      console.log('doesnt find element');
      return;
    } else if (open === matchId) {
      setOpen('');
      // close
      console.log('closing');
      large_display.classList.add('hidden');
    } else {
      //open
      console.log('opening');
      setOpen(matchId);
      large_display.classList.remove('hidden');
    }
  }
  return (
    <>
      {children}
      <div className="flex justify-center pr-2">
        <button onClick={() => open_match(matchId)}>{open === matchId ? '↑' : '↓'}</button>
      </div>
    </>
  );
}
