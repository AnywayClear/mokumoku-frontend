import Image from 'next/image';
import LogoImage from '../../public/images/mokumokuLogo.svg';
import Link from 'next/link';
import { ImSearch } from 'react-icons/im';

import { GrLogin } from 'react-icons/gr';
import { BiCoinStack } from 'react-icons/bi';
import { FaCircleUser, FaHeart, FaBagShopping } from 'react-icons/fa6';
import { ReactNode } from 'react';

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
    link: '/',
  },
  {
    title: '이용후기',
    link: '/',
  },
  {
    title: '고객센터',
    link: '/',
  },
];

type topButtonData = menuData & {
  icon: ReactNode;
};

// 로그인하고 포인트는 수정필요
const topButton: topButtonData[] = [
  { icon: <BiCoinStack />, title: '10000p', link: '/' },
  { icon: <FaBagShopping />, title: '물품등록', link: '/' },
  { icon: <FaCircleUser />, title: '마이페이지', link: '/' },
  { icon: <FaHeart />, title: '찜 목록', link: '/' },
  { icon: <GrLogin />, title: '로그인', link: '/' },
];

export default function Header() {
  return (
    <header className="m-4">
      <section className="flex justify-between items-center">
        <Image alt="MokuMoku" src={LogoImage} />
        <nav className="flex gap-6">
          <ul>
            {topButton.map(({ icon, title, link }, index) => (
              <li key={index}>
                <Link href={link} className="flex items-center gap-2 text-sm">
                  {icon}
                  <p>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <div className="flex justify-between items-center">
        <section className="flex gap-6 m-6">
          {menu.map(({ title, link }, index) => (
            <Link key={index} href={link}>
              <p className="text-lg">{title}</p>
            </Link>
          ))}
        </section>
        <ImSearch size="1.8em" />
      </div>
    </header>
  );
}
