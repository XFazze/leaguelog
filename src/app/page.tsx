'use client';
import { Inter } from '@next/font/google';
import { RegionNames } from '@/lib/game_constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
export default function Home() {
  const router = useRouter();
  const [region, set_region] = useState('EUNE');
  const [username, set_username] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/user/${region}/${username}`);
  };
  return (
    <main className="flex-col gap align-center" style={{ ['--gap' as any]: '4rem' }}>
      <h2>League Log is a website to look and analyse an users profile in League of Legends.</h2>
      <div className="flex-col gap align-center" style={{ ['--gap' as any]: '0.2rem' }}>
        <p>Search for a user here:</p>
        <form
          onSubmit={handleSubmit}
          method="get"
          className="flex-row gap h "
          style={{ ['--height' as any]: '2rem', ['--gap' as any]: '0.2rem' }}
        >
          <select
            name="region"
            id="region"
            className="text-size m pointer"
            style={{ ['--text-size' as any]: '0.9rem', ['--margin' as any]: '0.2rem' }}
            onChange={(e) => {
              set_region(e.target.value);
              router.prefetch(`/user/${region}/${username}`);
            }}
          >
            {Object.keys(RegionNames).map((region) => {
              return (
                <option value={region} className="pointer" key={region}>
                  {region}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            title="Username should be between 1 and 16"
            required
            minLength={1}
            maxLength={16}
            className="text-size m"
            style={{ ['--text-size' as any]: '0.9rem', ['--margin' as any]: '0.2rem' }}
            onChange={(e) => {
              set_username(e.target.value);
              router.prefetch(`/user/${region}/${username}`);
            }}
          />
          <button
            type="submit"
            className="text-size m pointer"
            style={{ ['--text-size' as any]: '0.9rem', ['--margin' as any]: '0.2rem' }}
          >
            Search
          </button>
        </form>
      </div>
    </main>
  );
}
