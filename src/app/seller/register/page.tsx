'use client';

import Uploader from '@/components/Uploader';
import { AuthContext } from '@/context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { KeyboardEvent, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { patch } from '@/service/api/http';
import { toast } from 'react-toastify';
import AWS from 'aws-sdk';
import SellerAuth from '@/components/SellerAuth';
import { getUserInfo } from '@/service/api/user';
import { userData } from '@/model/user';

const WRAPPER_INPUT_STYLE = 'w-9/12 mt-3';
const ERROR_STYLE = 'text-red-500 h-4 text-xs w-80 align-middle mx-auto';
const NICK_STYLE =
  'flex box-border h-4 w-80 border-2 p-4 align-middle mx-auto ';
const DESC_STYLE =
  'flex box-border h-60 w-80 border-2 p-4 align-middle mx-auto ';

const schema = yup
  .object({
    nickname: yup
      .string()
      .max(10, '최대 10자까지 입력가능합니다.')
      .required('대표자 이름을 입력하세요.'),
    description: yup
      .string()
      .max(200, '최대 200자까지 입력 가능합니다.')
      .required('소개글을 입력하세요.'),
    companyAddress: yup.string().required('사업장 위치를 입력하세요'),
    companyRegistrationNumber: yup
      .string()
      .required('사업자 번호를 입력하세요'),
    phoneNumber: yup.string().required('판매처 전화번호를 입력하세요'),
  })
  .required();

type Inputs = {
  nickname: string;
  description: string;
  companyAddress: string;
  companyRegistrationNumber: string;
  phoneNumber: string;
  // role: string;
};

export default function SellerRegister() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const { user } = useContext(AuthContext);

  if (!user?.userId) {
    // redirect('/product');
  }

  const mutation = useMutation({
    mutationFn: (data: Inputs) => {
      return patch(`/api/members`, data);
    },
    onSuccess: () => {
      toast('판매자 전환에 성공했습니다.');
    },
  });

  const handleImageSelected = (file: File) => {
    setFile(file);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let image = {
      Location: '',
    };
    // s3 업로드
    if (file) {
      image = await uploadS3(file);
      console.log('업로드 완');
    }

    console.log(image);

    const newData = {
      ...data,
      image: image.Location,
    };

    mutation.mutate(newData);
  };

  const uploadS3 = (image: File) => {
    AWS.config.update({
      region: process.env.NEXT_PUBLIC_REGION,
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY_ID,
    });

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: 'public-read',
        Bucket: 'mokumoku-image',
        Key: `upload/${image.name}`,
        Body: image,
      },
    });

    return upload.promise();
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      nickname: '',
      description: '',
      companyAddress: '',
      companyRegistrationNumber: '2018632486',
      phoneNumber: '',
      // role: 'ROLE_SELLER',
    },
    resolver: yupResolver(schema),
  });

  const { data: userData }: UseQueryResult<userData> = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserInfo(user?.userId ?? ''),
    enabled: !!user?.userId,
  });

  useEffect(() => {
    if (userData?.nickname) setValue('nickname', userData.nickname);
  }, [setValue, userData?.nickname]);

  const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <>
      {!isAuth ? (
        <SellerAuth setIsAuth={setIsAuth} />
      ) : (
        <form
          className="flex flex-col w-9/12 align-middle mx-auto justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={checkKeyDown}
        >
          <h2 className="text-2xl font-extrabold text-center">
            판매자 정보 등록
          </h2>
          <hr className="w-48 h-1 mx-auto my-4 bg-black" />
          <Uploader onImageSelected={handleImageSelected}></Uploader>
          <div className={WRAPPER_INPUT_STYLE}>
            <input
              className={NICK_STYLE}
              placeholder="닉네임"
              {...register('nickname')}
            ></input>
            <p className={ERROR_STYLE}>{errors.nickname?.message}</p>
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
              {...register('companyAddress')}
            ></input>
            <p className={ERROR_STYLE}>{errors.companyAddress?.message}</p>
          </div>
          <div className={WRAPPER_INPUT_STYLE}>
            <input
              className={NICK_STYLE}
              placeholder="사업자 등록번호"
              {...register('companyRegistrationNumber')}
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
      )}
    </>
  );
}
