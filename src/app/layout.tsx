import Header from '@/components/Header';
import './globals.css';
import type { Metadata } from 'next';
import { Dongle } from 'next/font/google';
import localFont from 'next/font/local';
import { AuthContext } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import QueryProvider from '@/context/QueryProvider';
import RecoilProvider from '@/context/RecoilProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const AuthContextProvider = dynamic(
  () => import('@/context/AuthContextProvider'),
  { ssr: false },
);

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
    <html lang="en" className={spokaFont.className}>
      <body className="w-full flex flex-col min-h-screen max-w-screen-xl mx-auto">
        <QueryProvider>
          <AuthContextProvider>
            <RecoilProvider>
              <ToastContainer />
              <Header />
              <main className="grow">{children}</main>
              <Footer />
            </RecoilProvider>
          </AuthContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
