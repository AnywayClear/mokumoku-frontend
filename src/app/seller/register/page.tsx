'use client';

import Uploader from '@/components/Uploader';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardEvent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const WRAPPER_INPUT_STYLE = 'w-9/12 mt-3';
const ERROR_STYLE = 'text-red-500 h-4 text-xs w-80 align-middle mx-auto';
const NICK_STYLE =
  'flex box-border h-4 w-80 border-2 p-4 align-middle mx-auto ';
const DESC_STYLE =
  'flex box-border h-60 w-80 border-2 p-4 align-middle mx-auto ';

const schema = yup
  .object({
    nickName: yup
      .string()
      .max(10, '최대 10자까지 입력가능합니다.')
      .required('대표자 이름을 입력하세요.'),
    description: yup
      .string()
      .max(200, '최대 200자까지 입력 가능합니다.')
      .required('소개글을 입력하세요.'),
    place: yup.string().required('사업장 위치를 입력하세요'),
    sellerNumber: yup.string().required('사업자 번호를 입력하세요'),
    phoneNumber: yup.string().required('판매처 전화번호를 입력하세요'),
  })
  .required();

type Inputs = {
  nickName: string;
  description: string;
  place: string;
  sellerNumber: string;
  phoneNumber: string;
};

export default function SellerRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nickName: '로그인 유저의 닉네임',
      description: '',
      place: '',
      sellerNumber: '방금 입력한 판매자 번호',
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <form
      className="flex flex-col w-9/12 align-middle mx-auto justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={checkKeyDown}
    >
      <h2 className="text-2xl font-extrabold text-center">판매자 정보 등록</h2>
      <hr className="w-48 h-1 mx-auto my-4 bg-black" />
      <Uploader></Uploader>
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={NICK_STYLE}
          placeholder="닉네임"
          {...register('nickName')}
        ></input>
        <p className={ERROR_STYLE}>{errors.nickName?.message}</p>
      </div>
      <div className={WRAPPER_INPUT_STYLE}>
        <textarea
          className={DESC_STYLE}
          placeholder="소개글"
          maxLength={200}
          {...register('description')}
        ></textarea>
        <div className="flex justify-center">
          <p className="flex justify-end  w-80 ">
            <span>{watch('description').length}</span>
            <span>/200 자</span>
          </p>
        </div>
        <p className={ERROR_STYLE}>{errors.description?.message}</p>
      </div>
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={NICK_STYLE}
          placeholder="위치"
          {...register('place')}
        ></input>
        <p className={ERROR_STYLE}>{errors.place?.message}</p>
      </div>
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={NICK_STYLE}
          placeholder="사업자 등록번호"
          {...register('sellerNumber')}
          //value={'이전 pg에서 입력한 판매자 번호'}
        ></input>
      </div>
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={NICK_STYLE}
          placeholder="판매자 전화번호"
          {...register('phoneNumber')}
        ></input>
        <p className={ERROR_STYLE}>{errors.phoneNumber?.message}</p>
      </div>
      <button className="w-40 p-2 mt-2 bg-black text-white rounded-lg">
        등록
      </button>
    </form>
  );
}
