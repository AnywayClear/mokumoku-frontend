'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup
  .object({
    name: yup
      .string()
      .max(10, '최대 10자까지 입력가능합니다.')
      .required('대표자 성명을 입력하세요.'),
    date: yup.string().required('개업 일자를 입력하세요.'),
    number: yup
      .string()
      .min(10, '특수문자를 제외한 10자리 등록번호를 입력하세요')
      .max(10, '사업자 등록 번호는 10자리입니다')
      .required('특수문자를 제외한 10자리 등록번호를 입력하세요'),
  })
  .required();

type Inputs = {
  name: string;
  date: string;
  number: string;
};
const WRAPPER_INPUT_STYLE = 'w-9/12 mt-3';

const ERROR_STYLE = 'text-red-500 h-4 text-xs w-80 align-middle mx-auto';
const NICK_STYLE =
  'flex box-border h-4 w-80 border-2 p-4 align-middle mx-auto ';
export default function SellerRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      date: '',
      number: '',
    },
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      className="flex flex-col w-9/12 align-middle mx-auto justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-extrabold text-center">사업자 확인</h2>
      <hr className="w-48 h-1 mx-auto my-4 bg-black" />
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={NICK_STYLE}
          placeholder="대표자 성명"
          {...register('name')}
        ></input>
        <p className={ERROR_STYLE}>{errors.name?.message}</p>
      </div>
      <div>
        <input className={NICK_STYLE} type="date" {...register('date')} />{' '}
        <p className={ERROR_STYLE}>{errors.date?.message}</p>
      </div>
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={NICK_STYLE}
          placeholder="사업자 등록 번호"
          {...register('number')}
        ></input>
        <p className={ERROR_STYLE}>{errors.number?.message}</p>
      </div>

      <button className="w-40 p-2 mt-2 bg-black text-white rounded-lg">
        확인
      </button>
    </form>
  );
}
