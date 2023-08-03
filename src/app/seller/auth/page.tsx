'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { KeyboardEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

export default function SellerAuth() {
  async function auth(name: string, date: string, number: string) {
    try {
      const businesses = [
        {
          b_no: number,
          start_dt: date.replace(/-/g, ''), // 날짜에서 '-' 제거
          p_nm: name,
          p_nm2: '', // 다른 값이 필요한 경우 추가
          b_nm: '', // 다른 값이 필요한 경우 추가
          corp_no: '', // 다른 값이 필요한 경우 추가
          b_sector: '', // 다른 값이 필요한 경우 추가
          b_type: '', // 다른 값이 필요한 경우 추가
          b_adr: '', // 다른 값이 필요한 경우 추가
        },
      ];

      const response = await axios({
        method: 'POST',
        url: 'https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=aJh1MFEPBeYe3aujW%2Bhu1dIo8AMu%2BY%2BBA5s7kurKQNrVGr2q%2BRXmmhGudTNIvRKletsw2fPSkrDzwHC1TMkqkg%3D%3D',
        headers: {
          'Content-Type': 'application/json',
        },
        data: { businesses },
      });

      if (response.status === 200) {
        console.log(response.data);
        alert('확인할 수 없는 사업자입니다.');
        if (response?.data?.data?.[0]?.valid == '01') {
          alert('인증되었습니다.');
          router.push('/seller/register');
        }
      } else {
        console.log('API 요청 실패');
      }
    } catch (error) {
      console.error('API 요청 에러:', error);
    }
  }
  const router = useRouter();
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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };
  const handleAuthClick = () => {
    const { name, date, number } = watch(); // watch 함수 사용하여 입력값 가져오기
    auth(name, date, number);
  };
  return (
    <form
      className="flex flex-col w-9/12 align-middle mx-auto justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={checkKeyDown}
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

      <button
        onClick={handleAuthClick}
        className="w-40 p-2 mt-2 bg-black text-white rounded-lg"
      >
        확인
      </button>
    </form>
  );
}
