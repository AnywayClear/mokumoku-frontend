'use client';
import { KeyboardEvent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DaumPostcode from 'react-daum-postcode';
import Uploader from '@/components/Uploader';
import { Modal } from 'antd';
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

const WRAPPER_INPUT_STYLE = 'w-9/12 mt-3';

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

  const onCompletePost = (data: any) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
    setModalState(false);
  }; // onCompletePost 함수

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <form
      className="flex flex-col w-9/12 align-middle mx-auto justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={checkKeyDown}
    >
      <h2 className="text-2xl font-extrabold text-center">회원정보 수정</h2>
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
          <button type="button" className={BUTTON_STYLE} onClick={modalToggle}>
            검색
          </button>
        </div>
        {modalState && (
          <Modal
            visible={true}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={modalToggle}
          >
            <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
          </Modal>
        )}
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
      <button className="w-40 p-2 mt-2 bg-black text-white rounded-lg">
        수정완료
      </button>
      <button type="button" className="text-gray-500">
        판매자로 전환하기
      </button>
    </form>
  );
}
