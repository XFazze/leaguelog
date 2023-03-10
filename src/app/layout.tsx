import './globals.css';
import localFont from '@next/font/local';
import Link from 'next/link';

const spiegel = localFont({
  src: [
    { path: './fonts/spiegel-regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/spiegel-bold.woff2', weight: '400', style: 'bold' },
  ],
  variable: '--font-surt-bold',
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spiegel.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="">
        <div className="flex-col">
          <div
            className="w-full flex-row p-2 gap space-between border-bottom-secondary"
            style={{ ['--gap' as any]: '2rem' }}
          >
            <div className="gap" style={{ ['--gap' as any]: '2rem' }}>
              <Link href="/">
                <h1>League Log</h1>
              </Link>
            </div>
            <Link href="https://fabianoden.com" target="_blank">
              <h1>Owners website</h1>
            </Link>
          </div>
          <div className="w-full p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
