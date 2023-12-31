import Image from 'next/image';
import LogoImage from '../../public/images/mokumokuLogo.svg';
import Link from 'next/link';
import { ImSearch } from 'react-icons/im';

import { BiCoinStack } from 'react-icons/bi';
import { FaCircleUser, FaHeart, FaBagShopping } from 'react-icons/fa6';
import { ReactNode } from 'react';
import LoginButton from './LoginButton';
import Search from './Search';
import ToMyPageButton from './ToMyPageButton';
import ProduceRegisterButton from './ProduceRegisterButton';
import NotificationButton from './NotificationButton';

type menuData = {
  title: string;
  link: string;
};

const menu: menuData[] = [
  {
    title: '모꾸모꾸',
    link: '/',
  },
  {
    title: '경매',
    link: '/product',
  },
  {
    title: '고객센터',
    link: '/contact',
  },
];

type topButtonData = menuData & {
  icon: ReactNode;
};

// 로그인하고 포인트는 수정필요
const topButton: topButtonData[] = [
  { icon: <BiCoinStack />, title: '충전하기', link: '/pay' },
  // { icon: <FaBagShopping />, title: '물품등록', link: '/product/register' },
  // { icon: <FaHeart />, title: '찜 목록', link: '/' },
];

export default function Header() {
  return (
    <header className="m-4 ml-0 w-[1280px]">
      <section className="flex justify-between items-center">
        <Link href={'/'}>
          <Image alt="MokuMoku" src={LogoImage} />
        </Link>
        <nav className="flex gap-6">
          {topButton.map(({ icon, title, link }, index) => (
            <Link
              key={index}
              href={link}
              className="flex items-center gap-2 text-sm"
            >
              {icon}
              <p>{title}</p>
            </Link>
          ))}
          <ProduceRegisterButton />
          <ToMyPageButton />
          <LoginButton />
          <NotificationButton />
        </nav>
      </section>
      <div className="flex justify-between items-center ml-3">
        <section className="flex gap-6 m-6 ml-0">
          {menu.map(({ title, link }, index) => (
            <Link key={index} href={link}>
              <p className="text-lg">{title}</p>
            </Link>
          ))}
        </section>
        <Search />
      </div>
    </header>
  );
}
