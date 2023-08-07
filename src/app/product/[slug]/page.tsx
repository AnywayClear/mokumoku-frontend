'use client';

import Image from 'next/image';
import LogoImage from '../../../../public/images/mokumokuLogo.svg';
import { Produce } from '@/model/produce';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getProduce } from '@/service/api/produce';
import ProduceAuctionList from '@/components/ProduceAuctionList';

type Props = {
  params: {
    slug: number;
  };
};

export default function ProductDetailPage({ params: { slug } }: Props) {
  const { data: produce }: UseQueryResult<Produce> = useQuery({
    queryKey: ['produce', slug],
    queryFn: () => getProduce(slug),
  });

  // const {
  //   id,
  //   name,
  //   seller,
  //   description,
  //   image,
  //   startPrice,
  //   kg,
  //   ea,
  //   startDate,
  //   endDate,
  //   status,
  //   dibNum,
  //   auctionResponseList,
  // } = produce;

  return (
    <div className="flex flex-col items-center">
      <section className="flex w-full">
        <div className="basis-5/12 relative">
          <Image alt="logo" className="object-fill" fill src={LogoImage} />
        </div>

        <div className="basis-7/12">
          <div className="py-4 border-t-4 border-b-2 border-t-black border-b-gray-200">
            <div className="flex my-2">
              <Image alt="logo" width={100} height={100} src={LogoImage} />
              <p className="font-bold">{produce?.seller}</p>
            </div>

            <div className="w-full">
              <p className="text-xl font-bold">{produce?.name}</p>
              <div className="flex justify-between my-4 font-medium">
                <div className="flex gap-6">
                  <p>시작 가격</p>
                  <p>{`${produce?.startPrice.toLocaleString('ko-KR')}원`}</p>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-end gap-4">
                    <p>수량</p>
                    <p>물품당 무게</p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <p>{produce?.ea}</p>
                    <p>{`${produce?.kg}kg`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold my-6">배송정보</p>

            <div className="flex text-sm gap-4">
              <p className="w-20">배송비</p>
              <p className="leading-loose">
                해당 스토어 제품으로만 10000원 이상 구매시 무료배송 (미만시
                배송비 3000원 발생) <br /> 제주도를 포함한 도서/산간지역은
                추가배송비 3000원
              </p>
            </div>
            <div className="flex text-sm gap-4 my-6">
              <p className="w-20">배송예정</p>
              <p>1일 이내 출고(주말, 공휴일 제외)</p>
            </div>
          </div>
          <div className="flex justify-center py-8">
            {produce?.status === 0 ? (
              <input
                type="button"
                value="경매 대기       |       2023.07.23 16:00"
                className="bg-yellow-300  border-2 border-black rounded-md py-2 px-10"
              />
            ) : produce?.status === 1 ? (
              <input
                type="button"
                value="진행중       |       2023.07.23 16:00"
                className="bg-green-500  border-2 border-black rounded-md py-2 px-10"
              />
            ) : (
              <input
                type="button"
                value="경매 종료       |       2023.07.23 16:00"
                className="bg-red-500  border-2 border-black rounded-md py-2 px-10"
              />
            )}
          </div>
        </div>
      </section>
      <section className="w-full">
        <p className="font-bold">경매 목록</p>
        <ProduceAuctionList auctionList={produce?.auctionResponseList[0]} />
      </section>
      <section className="w-full my-4">
        <p className="font-bold">상품 설명</p>
        <p className="my-4 text-center">상품 설명</p>
      </section>
    </div>
  );
}
