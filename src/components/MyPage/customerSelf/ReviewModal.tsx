'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import { GrClose } from 'react-icons/gr';
import { useState } from 'react';
import styles from './Scrollbar.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '@/service/api/review';

interface review {
  id: number;
  rate: number;
  content: string;
}

// img는 기본 이미지가 있기 때문에 undefinded 되지 않는다.
type Props = {
  deadID: number;
  title: string;
  img: string;
  unit: number;
  price: number;
  closeModal: Function;
};

export default function ReviewModal({
  deadID,
  title,
  img,
  unit,
  price,
  closeModal,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<review>({ mode: 'onChange' });

  const queryClient = useQueryClient();
  const [mouseDownOutside, setMouseDownOutside] = useState<boolean>(false);
  const [showRateErrMsg, setShowRateErrMsg] = useState<boolean>(true);

  const onSubmit: SubmitHandler<review> = (data) => {
    post.mutate();
    closeModal();
  };

  const post = useMutation(() => postReview(deadID,getValues('content'),getValues('rate')), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dealList'] });
      closeModal();
    },
  });



  const validateRate = (value: number | null) => {
    if (value === null) {
      return false;
    } else if (value < 1 || value > 5) {
      return false;
    }
    return true;
  };

  function deleteModal() {
    setMouseDownOutside(false);
    if (mouseDownOutside) {
      closeModal();
    }
  }

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <input {...register('id')} type="hidden"></input>
          <p className="font-semibold text-2xl mb-2">평점을 남겨주세요!</p>
          <Rating
            name="rates"
            size="large"
            onChange={(event, newValue) => {
              console.log('새 밸류' + newValue);
              if (newValue !== null) {
                setValue('rate', newValue);
                setShowRateErrMsg(false);
              } else {
                setValue('rate', -1);
                setShowRateErrMsg(true);
              }
            }}
          />
          <input
            {...register('rate', { required: true, validate: validateRate })}
            type="hidden"
            className="mt-8"
          ></input>
          {errors.rate &&
            (errors.rate.type === 'required' ||
              errors.rate.type === 'validate') &&
            showRateErrMsg && (
              <p className="text-red-500">평점을 입력해주세요.</p>
            )}

          <p className="font-semibold text-2xl mt-4 mb-4">
            좋았던 점을 설명해주세요!
          </p>
          <textarea
            {...register('content', {
              required: true,
              minLength: 10,
              maxLength: 200,
            })}
            placeholder="좋았던 점에 대해 글을 남겨주세요 (최소 10자)"
            className="bg-gray-100 w-5/6 h-28 mx-10 text-xl mb-2 resize-none"
          />
          {errors.content && errors.content?.type === 'required' && (
            <p className="text-red-500">내용을 입력해주세요.</p>
          )}
          {errors.content && errors.content?.type === 'minLength' && (
            <p className="text-red-500">글자 수는 최소 10자 입니다.</p>
          )}
          {errors.content && errors.content?.type === 'maxLength' && (
            <p className="text-red-500">글자 수는 최대 200자 입니다.</p>
          )}
          <button
            type="submit"
            className="bg-green-600 rounded-lg text-2xl px-5 py-2 mt-6 text-white hover:bg-green-500"
          >
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
}
