'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Image from 'next/image';
import { GrClose } from 'react-icons/gr';
import { useContext, useState } from 'react';
import styles from './Scrollbar.module.css';
import { changePoint, getPoint } from '@/service/api/point';
import { UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userPoint } from '@/model/point';
import { AuthContext } from '@/context/AuthContext';
import { postDealPaid } from '@/service/api/deal';

interface pay {
  id: number;
  rate: number;
  content: string;
}

type Props = {
  deadID: number;
  title: string;
  img: string;
  unit: number;
  price: number;
  closeModal: Function;
};

export default function PayModal({
  deadID,
  title,
  img,
  unit,
  price,
  closeModal,
}: Props) {
  const {
    formState: { errors },
    getValues,
  } = useForm<pay>({ mode: 'onChange' });
  const [mouseDownOutside, setMouseDownOutside] = useState<boolean>(false);

  function deleteModal() {
    setMouseDownOutside(false);
    if (mouseDownOutside) {
      closeModal();
    }
  }

  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: userPoint }: UseQueryResult<userPoint> = useQuery({
    queryKey: ['userPoint'],
    queryFn: () => getPoint(user?.userId ?? ''),
    enabled: !!user?.userId,
  });

  const pay = useMutation(() => changePoint(user?.userId || '', price * -1), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPoint'] });
      setPaid.mutate();
      closeModal();
    },
  });

  const setPaid = useMutation(() => postDealPaid(deadID), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dealList'] });
      closeModal();
    },
  });

  return (
    <div
      className="bg-black bg-opacity-70 flex fixed inset-0 items-center justify-center z-50"
      onMouseUp={() => deleteModal()}
      onMouseDown={() => setMouseDownOutside(true)}
    >
      <div
        className={` bg-white border-2 w-[600px] h-[650px] pb-4 rounded-lg relative overflow-hidden overflow-y-scroll ${styles.verticalScroll}`}
        onMouseUp={(e) => {
          e.stopPropagation();
          setMouseDownOutside(false);
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="top-4 right-4 absolute text-4xl"
          onClick={() => closeModal()}
        >
          <GrClose />
        </button>
        <p className="text-center font-semibold text-3xl py-5 border-b">
          물품 리뷰 작성
        </p>
        <div className="p-6 mb-8 flex border-b-4 border-gray-200">
          <Image
            src={img}
            alt="상품이미지"
            width={300}
            height={300}
            className="h-[96px] w-[128px] object-cover mr-3"
          ></Image>
          <div className="w-[400px] flex flex-col justify-around py-4">
            <p className="text-2xl font-semibold truncate">{title}</p>
            <p className="text-lg text-gray-500">
              [{unit}kg {price}원]
            </p>
          </div>
        </div>
        <div>
          <p>현재금액 {price}원</p>
          <p>내 돈 {userPoint?.balance}원</p>
          <p>
            결제 후 남는 돈{' '}
            {userPoint !== undefined ? userPoint.balance - price : '?'}원
          </p>
          <button
            onClick={() => {
              if (userPoint) {
                if (price > userPoint.balance) {
                  console.log('비싸서 결제 못해요');
                } else {
                  pay.mutate();
                }
              }
            }}
          >
            돈 내기
          </button>
        </div>
      </div>
    </div>
  );
}
