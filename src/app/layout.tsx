import '../styles/globals.css';
import localFont from 'next/font/local';
import Link from 'next/link';
import SearchBar from './components/SearchBar';

const spiegel = localFont({
  src: [
    { path: './fonts/spiegel-regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/spiegel-bold.woff2', weight: '400', style: 'bold' },
  ],
  variable: '--font-spiegel',
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spiegel.variable} font-sans`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="bg-cyan-950">
        <div className="flex-col ">
          <div
            className="w-full flex flex-row p-2 justify-between border-bottom-secondary"
            style={{ ['--gap' as any]: '2rem' }}
          >
            <div className="gap " style={{ ['--gap' as any]: '2rem' }}>
              <Link href="/">
                <h1>League Log</h1>
              </Link>
            </div>
            <SearchBar></SearchBar>
          </div>
          <div className="w-full p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
