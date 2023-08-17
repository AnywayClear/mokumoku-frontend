'use client';

import Image from 'next/image';
import LogoImage from '../../../../public/images/mokumokuLogo.svg';
import { Produce } from '@/model/produce';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getProduce } from '@/service/api/produce';
import ProduceAuctionList from '@/components/ProduceAuctionList';
import Link from 'next/link';
import DibButton from '@/components/DibButton';
import ProduceReview from '@/components/ProduceReview';
import dayjs from 'dayjs';

type Props = {
  params: {
    slug: number;
  };
};

export default function ProductDetailPage({ params: { slug } }: Props) {
  const { data: produce }: UseQueryResult<Produce> = useQuery({
    queryKey: ['produce', slug],
    queryFn: () => getProduce(slug),
    refetchInterval: 5000,
  });

  return (
    <div className="flex flex-col items-center">
      <section className="flex w-full gap-4">
        <div className="basis-5/12 relative">
          <Image
            alt="logo"
            className="object-contain"
            fill
            src={produce?.image || LogoImage}
          />
        </div>

        <div className="basis-7/12">
          <div className="py-4 border-t-4 border-b-2 border-t-black border-b-gray-200">
            <div className="flex my-2 gap-2 items-center justify-between">
              <div className="flex gap-2">
                <div className="relative aspect-square w-6 h-6">
                  <Image
                    alt="logo"
                    fill
                    src={produce?.sellerImage || LogoImage}
                  />
                </div>
                <Link href={`/otherpage/${produce?.sellerId}`}>
                  <p className="font-bold">{produce?.seller}</p>
                </Link>
              </div>
              <div>
                <DibButton produceId={produce?.id || 0} />
              </div>
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
                value={`경매 대기       |       ${dayjs(produce?.startDate)
                  .format('YYYY-MM-DD HH:mm')
                  .toString()}`}
                className="bg-yellow-300  border-2 border-black rounded-md py-2 px-20"
              />
            ) : produce?.status === 1 ? (
              <input
                type="button"
                value={`진행중       |       ${dayjs(produce?.startDate)
                  .format('YYYY-MM-DD HH:mm')
                  .toString()}`}
                className="bg-green-500  border-2 border-black rounded-md py-2 px-20"
              />
            ) : (
              <input
                type="button"
                value={`경매 종료       |       ${dayjs(produce?.startDate)
                  .format('YYYY-MM-DD HH:mm')
                  .toString()}`}
                className="bg-red-500  border-2 border-black rounded-md py-2 px-20"
              />
            )}
          </div>
        </div>
      </section>
      <section className="w-full mt-10">
        <p className="font-bold">경매 목록</p>
        <ProduceAuctionList id={produce?.id} status={produce?.status} />
      </section>
      <section className="w-full my-4">
        <p className="font-bold">상품 설명</p>
        <p className="my-4 text-center text-2xl">{produce?.description}</p>
      </section>
      <section className="w-full my-4">
        <p className="font-bold">판매자 리뷰</p>
        <ProduceReview sellerId={produce?.sellerId || ''} />
      </section>
    </div>
  );
}
