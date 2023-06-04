'use client';
import { Inter } from 'next/font/google';
import SearchBar from './components/SearchBar';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  return (
    <main className="flex flex-col gap items-center" style={{ ['--gap' as any]: '4rem' }}>
      <h2>League Log is a website to look and analyse an users profile in League of Legends.</h2>
      <div className="flex flex-col gap items-center" style={{ ['--gap' as any]: '0.2rem' }}>
        <p>Search for a user here:</p>
        <SearchBar></SearchBar>
      </div>
    </main>
  );
}
