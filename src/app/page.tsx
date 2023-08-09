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
    </>
  );
}
