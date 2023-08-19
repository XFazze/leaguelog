'use client';
import { RegionNames } from '@/lib/gameConstants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SearcBar() {
  const router = useRouter();
  const [region, set_region] = useState('EUW');
  const [username, set_username] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/user/${region}/${username}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="get"
      className="flex flex-row gap-2 "
      style={{ ['--height' as any]: '2rem', ['--gap' as any]: '0.2rem' }}
    >
      <select
        name="region"
        id="region"
        className="text-size rounded-md pointer"
        style={{ ['--text-size' as any]: '0.9rem', ['--margin' as any]: '0.2rem' }}
        onChange={(e) => {
          set_region(e.target.value);
          // router.prefetch(`/user/${region}/${username}`);
        }}
      >
        {Object.keys(RegionNames).map((region) => {
          return (
            <option value={region} className="pointer text-center" key={region}>
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
        className="text-size rounded-md"
        style={{ ['--text-size' as any]: '0.9rem', ['--margin' as any]: '0.2rem' }}
        onChange={(e) => {
          set_username(e.target.value);
          // router.prefetch(`/user/${region}/${username}`);
        }}
      />
      <button
        type="submit"
        className="text-size m pointer rounded-md bg-white"
        style={{ ['--text-size' as any]: '0.9rem', ['--margin' as any]: '0.2rem' }}
      >
        Search
      </button>
    </form>
  );
}
