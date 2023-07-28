'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DaumPostcode from 'react-daum-postcode';
import Uploader from '@/components/Uploader';
import axios from 'axios';

const schema = yup
  .object({
    nickName: yup
      .string()
      .max(10, '최대 10자까지 입력가능합니다.')
      .required('닉네임을 입력하세요.'),
    image: yup.string().max(30, '최대 30자까지 입력 가능합니다.').required(),
    address: yup
      .string()
      .max(30, '최대 30자까지 입력 가능합니다')
      .required('주소를 입력하세요.'),
  })
  .required();

type Inputs = {
  nickName: string;
  image: string;
  address: string;
};

const LABEL_STYLE = 'leading-loose text-left block text-black text-sm w-3/12';
const INPUT_STYLE =
  'block box-border rounded-md w-full border-2 border-solid border-black py-2 px-3 text-sm text-black';

const WRAPPER_INPUT_STYLE = 'w-9/12';

const WRAPPER_STYLE = 'flex gap-4 my-4 ';

const ERROR_STYLE = 'text-red-500 h-4 text-xs w-80 align-middle mx-auto';
const NICK_STYLE =
  'flex box-border h-4 w-80 border-2 p-4 align-middle mx-auto ';
const PCODE_STYLE = 'box-border h-4 w-4/5 p-4 border-2 align-middle mx-auto';
const ADDRESS_STYLE =
  'flex box-border h-4 w-80 p-4 border-2 align-middle mx-auto';
const BUTTON_STYLE = 'w-1/5 ml-3 bg-black text-white rounded-lg';
export default function ConsumerRegister() {
  const [inputAddress, setInputAddressValue] = useState('');
  const [inputZipCodeValue, setInputZipCodeValue] = useState('');
  const [modalState, setModalState] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  console.log(errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const modalToggle = () => {
    setModalState(!modalState);
  };

  useEffect(() => {
    // modalState가 변경될 때마다 postCodeStyle을 업데이트
    const postCodeStyle = {
      width: '400px',
      height: '400px',
      display: modalState ? 'block' : 'none',
    };
    setPostCodeStyle(postCodeStyle);
  }, [modalState]);

  const [postCodeStyle, setPostCodeStyle] = useState({
    width: '400px',
    height: '400px',
    display: 'none', // 초기 값은 모달이 닫혀있도록 설정
  });

  const onCompletePost = (data: any) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
    setModalState(false);
  }; // onCompletePost 함수

  return (
    <form
      className="flex flex-col w-9/12 align-middle mx-auto justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-extrabold text-center">회원정보등록</h2>
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
      <div className="flex flex-col m-3 gap-2">
        <div className="flex w-80">
          <input
            className={PCODE_STYLE}
            value={inputZipCodeValue}
            placeholder="우편번호"
            type={'text'}
          ></input>
          <button className={BUTTON_STYLE} onClick={modalToggle}>
            검색
          </button>
        </div>
        <DaumPostcode
          style={postCodeStyle}
          onComplete={onCompletePost}
        ></DaumPostcode>

        <input
          className={ADDRESS_STYLE}
          value={inputAddress}
          placeholder="주소"
        ></input>
      </div>
      <div className={WRAPPER_INPUT_STYLE}>
        <input
          className={ADDRESS_STYLE}
          placeholder="상세주소를 입력해주세요"
          {...register('address')}
        ></input>
        <p className={ERROR_STYLE}>{errors.address?.message}</p>
      </div>
      <button className="flex p-2 mt-2 bg-black text-white rounded-lg">
        등록하기
      </button>
    </form>
  );
}
