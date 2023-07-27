'use client';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DaumPostcode from 'react-daum-postcode';
import Uploader from '@/components/Uploader';
import { Button } from '@/components/Button';
import axios from 'axios';

const schema = yup
  .object({
    nickName: yup.string().max(10, '최대 10자까지 입력가능합니다.').required(),
    image: yup.string().max(30, '최대 30자까지 입력 가능합니다.').required(),
    address: yup.string().max(30, '최대 30자까지 입력 가능합니다').required(),
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

const WRAPPER_STYLE = 'flex gap-4 my-4';

const ERROR_STYLE = 'text-red-500 h-4 text-xs';
const NICK_PCODE_STYLE =
  'box-border h-4 w-40 p-4 border-2 align-middle mx-auto';
const ADDRESS_STYLE = 'box-border h-4 w-80 p-4 border-2 align-middle mx-auto';
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
      <hr />
      <Uploader></Uploader>
      <input className={NICK_PCODE_STYLE} placeholder="닉네임"></input>
      <div className="flex gap-4 w-80">
        <input
          className={NICK_PCODE_STYLE}
          value={inputZipCodeValue}
          placeholder="우편번호"
          type={'text'}
        ></input>
        <button onClick={modalToggle}>주소찾기</button>
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
      <input
        className={ADDRESS_STYLE}
        placeholder="상세주소를 입력해주세요"
      ></input>
      <button>등록하기</button>
    </form>
  );
}
