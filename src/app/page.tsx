'use client';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import MainImage from '../../public/images/main/main_1.jpg';
import MainImage2 from '../../public/images/main/main_2.jpg';
import MainImage3 from '../../public/images/main/main_3.jpg';
import MainImage4 from '../../public/images/main/main_4.jpg';
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import MainBoxImage from '../../public/images/main/main_box.svg';
import MainDownImage from '../../public/images/main/main_down.svg';
import MainLeafImage from '../../public/images/main/main_leaf.svg';

export default function Home() {
  const { user } = useContext(AuthContext);

  // const { data: produce }: UseQueryResult<Produce> = useQuery({
  //   queryKey: ['produce', slug],
  //   queryFn: () => getProduce(slug),
  // });

  // const { data: produce }: UseQueryResult<Produce> = useQuery({
  //   queryKey: ['produce', slug],
  //   queryFn: () => getProduce(slug),
  // });

  // const { data: produce }: UseQueryResult<Produce> = useQuery({
  //   queryKey: ['produce', slug],
  //   queryFn: () => getProduce(slug),
  // });

  if (!user?.userId) {
    // redirect('/product');
  }

  // console.log(user);

  return (
    <>
      <div className="relative aspect-[16/7]">
        <Image className="object-cover" alt="main" src={MainImage} fill />
      </div>
      <div>
        <Carousel infiniteLoop>
          <div className="relative aspect-[16/7]">
            <Image alt="2" src={MainImage2} fill />
            <p className="legend">Legend 1</p>
          </div>
          <div className="relative aspect-[16/7]">
            <Image alt="3" src={MainImage3} fill />
            <p className="legend">Legend 2</p>
          </div>
          <div className="relative aspect-[16/7]">
            <Image alt="4" src={MainImage4} fill />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
      <h1>main</h1>
      <div className="flex gap-4 justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="relative w-[68px] h-[68px] border-2 border-black rounded-full">
            <Image
              alt="logo"
              className="object-cover rounded-full w-16 h-16 p-[0.2rem]"
              fill
              src={MainBoxImage}
            />
          </div>
          <p className="text-lg font-bold leading-6 text-gray-900">
            가장 소량씩, 가장 신성하게
          </p>
          <p className="text-sm font-base leading-6 text-gray-400">
            적은 양으로 부담없이 즐겨요.</p>
        </div>

        <div>
          <div className="relative w-[68px] h-[68px] border-2 border-black rounded-full">
            <Image
              alt="logo"
              className="object-cover rounded-full w-16 h-16 p-[0.2rem]"
              fill
              src={MainDownImage}
            />
          </div>
          <p>친환경 채소를 가장 저렴하게!</p>
          <p>30% OFF, 합리적인 가격으로 만나요!</p>
        </div>

        <div>
          <div className="relative w-[68px] h-[68px] border-2 border-black rounded-full">
            <Image
              alt="logo"
              className="object-cover rounded-full w-16 h-16 p-[0.2rem]"
              fill
              src={MainLeafImage}
            />
          </div>
          <p>환경에 한 발 나은 선택</p>
          <p>환경에 더 가까운 생산과 소비를 지지해요.</p>
        </div>
      </div>
    </>
  );
}
