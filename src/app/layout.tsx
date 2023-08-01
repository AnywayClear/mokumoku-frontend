import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Dongle } from 'next/font/google';
import localFont from 'next/font/local';
import { AuthContext } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import AuthContextProvider from '@/context/AuthContextProvider';
import QueryProvider from '@/context/QueryProvider';

const RobotoMono = Dongle({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

const spokaFont = localFont({
  src: [
    {
      path: '../../public/fonts/SpoqaHanSansNeo-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SpoqaHanSansNeo-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SpoqaHanSansNeo-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'MokuMoku',
  description: 'sell vegetable',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spokaFont.className}>
        <QueryProvider>
          <AuthContextProvider>
            <Header />
            <main>{children}</main>
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
