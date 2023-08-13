import { Auction } from '@/model/produce';
import { Button } from './Button';
import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuctionCount from './AuctionCount';
import { useMutation } from '@tanstack/react-query';
import { postAuction } from '@/service/api/produce';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    money: yup
      .number()
      .min(1, '충전금액은 1000원 이상이어야 합니다.')
      .required('충전금액은 1000원 이상이어야 합니다.')
      .typeError('충전금액을 입력해주세요.'),
  })
  .required();

type Props = {
  auction: Auction;
  produceStatus: number | undefined;
};

type Inputs = {
  money: number;
};

const INPUT_STYLE =
  'block box-border rounded-md w-full border-2 border-solid border-black py-2 px-3 text-sm text-black';

const WRAPPER_INPUT_STYLE = '';

const WRAPPER_STYLE = 'flex gap-4 my-4 justify-center';

const ERROR_STYLE = 'text-red-500 h-4 text-xs';

export default function ProduceAuction({ auction, produceStatus }: Props) {
  const mutation = useMutation({
    mutationFn: (data: { auctionId: number; price: number }) => {
      return postAuction(data.auctionId, data.price);
    },
    onSuccess: () => {
      toast('입찰에 성공했습니다.');
      // router.replace('/product');
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      money: auction.price,
    },
    resolver: yupResolver(schema),
  });

  const buttonHandleClick = (diff: number) => {
    const sum = watch('money') + diff;
    setValue('money', sum < auction.price ? auction.price : sum);
  };

  const auctionHandleClick = (auctionId: number, price: number) => {
    mutation.mutate({ auctionId, price });
  };

  return (
    <li
      key={auction.id}
      className="flex justify-between gap-x-6 px-5 w-[500px] shadow-sm shadow-black py-5 rounded-md"
    >
      <div className="flex min-w-0 gap-x-4 items-center">
        {/* <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={auction.imageUrl}
              alt=""
            /> */}
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {`현재 가격 : ${auction.price}원`}
          </p>

          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {auction.nickname || '입찰자 없음'}
          </p>
          <div className="flex gap-1 items-center">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {'남은시간 :'}
            </p>
            {!auction.status ? (
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {`5분 0초`}
              </p>
            ) : (
              <AuctionCount updatedAt={auction.updatedAt} />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        {produceStatus !== 2 ? (
          <>
            <label
              htmlFor="hi"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              다음 금액
            </label>
            <div className={WRAPPER_INPUT_STYLE}>
              <input
                type="number"
                className={INPUT_STYLE}
                placeholder="금액"
                step={'100'}
                {...register('money')}
              />
              <p className={ERROR_STYLE}>{errors.money?.message}</p>
            </div>
            <div className="flex gap-2">
              {[-1000, -100, +100, +1000].map((diff, index) => (
                <Button
                  key={index}
                  size="small"
                  variant="thirdly"
                  onClick={() => buttonHandleClick(diff)}
                >
                  {diff < 0 ? diff : `+${diff}`}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className='"text-sm font-semibold leading-6 text-gray-900"'>
            {`최종 입찰가 :  ${auction.price}원`}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <div className="mt-1 flex items-center gap-x-1.5">
            <div
              className={`flex-none rounded-full ${
                produceStatus === 0
                  ? 'bg-yellow-500/20'
                  : produceStatus === 1
                  ? 'bg-emerald-500/20'
                  : 'bg-red-500/20'
              } p-1`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  produceStatus === 0
                    ? 'bg-yellow-500'
                    : produceStatus === 1
                    ? 'bg-emerald-500'
                    : 'bg-red-500'
                }`}
              />
            </div>
            <p className="text-xs leading-5 text-gray-500">
              {produceStatus === 0
                ? '대기중'
                : produceStatus === 1
                ? '경매중'
                : '종료'}
            </p>
          </div>
        </div>
        {auction.status && (
          <Button
            onClick={() => auctionHandleClick(auction.id, watch('money'))}
          >
            입찰
          </Button>
        )}
      </div>
    </li>
  );
}
