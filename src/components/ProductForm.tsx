'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaPhotoVideo } from 'react-icons/fa';
import { ChangeEvent, DragEvent, useState } from 'react';
import Image from 'next/image';
import AWS from 'aws-sdk';
import { useMutation } from '@tanstack/react-query';
import { postProduce } from '@/service/api/produce';
import { PostProduce } from '@/model/produce';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button } from './Button';
import dayjs from 'dayjs';

const schema = yup
  .object({
    name: yup
      .string()
      .max(30, '최대 30자까지 입력 가능합니다.')
      .required('제목을 입력하세요.'),
    description: yup
      .string()
      .max(30, '최대 30자까지 입력 가능합니다.')
      .required('상품 설명을 입력하세요.'),
    startPrice: yup
      .number()
      .min(1, '시작 가격은 1원 이상이어야 합니다.')
      .required('필수 입력 항목입니다.')
      .typeError('시작 가격을 입력해주세요.'),
    kg: yup
      .number()
      .min(1, '무게는 1kg 이상이어야 합니다.')
      .required('무게는 1kg 이상이어야 합니다.')
      .typeError('무게를 입력해주세요.'),
    startDate: yup
      .date()
      .required('필수 입력 항목입니다.')
      .typeError('시작시간을 입력해주세요.'),
    // endDate: yup
    //   .date()
    //   .min(
    //     yup.ref('startDate'),
    //     '경매 종료 시간은 경매 시작 시간보다 늦어야 합니다.',
    //   )
    //   .required('필수 입력 항목입니다.')
    //   .typeError('종료시간을 입력해주세요.'),
    ea: yup
      .number()
      .min(1, '개수는 1개 이상이어야 합니다.')
      .max(10, '개수는 최대 10개입니다.')
      .required('수량은 1개 이상이어야 합니다.')
      .typeError('수량을 입력해주세요.'),
  })
  .required();

type Inputs = {
  name: string;
  description: string;
  startPrice: number;
  kg: number;
  startDate: Date;
  // endDate: Date;
  ea: number;
};

const LABEL_STYLE = 'leading-loose text-left block text-black text-sm w-3/12';
const INPUT_STYLE =
  'block box-border rounded-md w-full border-2 border-solid border-black py-2 px-3 text-sm text-black';

const WRAPPER_INPUT_STYLE = 'w-9/12';

const WRAPPER_STYLE = 'flex gap-4 my-4';

const ERROR_STYLE = 'text-red-500 h-4 text-xs';

export default function ProductForm() {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (data: PostProduce) => {
      return postProduce(data);
    },
    onSuccess: () => {
      toast('농산물 등록에 성공했습니다.');
      router.replace('/product');
    },
  });
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  // s3 업로드 함수
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let image = {
      Location: '',
    };
    // s3 업로드
    if (file) {
      image = await uploadS3(file);
    }

    const newData = {
      ...data,
      startDate: dayjs(data.startDate).format('YYYY-MM-DDTHH:mm:ss'),
      // endDate: dayjs(data.endDate).format('YYYY-MM-DDTHH:mm:ss'),
      image: image.Location,
    };
    mutation.mutate(newData);
  };
  return (
    <form className="flex flex-col w-9/12" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="hidden"
        name="input"
        id="input-upload"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <label
        className={`w-full h-60 flex flex-col items-center justify-center ${
          !file && 'border-2 border-sky-500 border-dashed'
        }`}
        htmlFor="input-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {dragging && (
          <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
        )}
        {!file && (
          <div className="flex flex-col items-center pointer-events-none">
            <FaPhotoVideo className="w-20 h-20 text-gray-300" />{' '}
            <p>제품 사진을 등록해주세요.</p>
          </div>
        )}
        {file && (
          <div className="relative w-full aspect-square">
            <Image
              className="object-cover"
              src={URL.createObjectURL(file)}
              alt="local file"
              fill
              sizes="650px"
            />
          </div>
        )}
      </label>

      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>제목</label>
        <div className={WRAPPER_INPUT_STYLE}>
          <input
            className={INPUT_STYLE}
            placeholder="상품 제목"
            {...register('name')}
          />
          <p className={ERROR_STYLE}>{errors.name?.message}</p>
        </div>
      </div>

      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>내용</label>
        <div className={WRAPPER_INPUT_STYLE}>
          <input
            className={INPUT_STYLE}
            placeholder="상품 설명"
            {...register('description')}
          />
          <p className={ERROR_STYLE}>{errors.description?.message}</p>
        </div>
      </div>

      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>시작가격</label>

        <div className={WRAPPER_INPUT_STYLE}>
          <input
            type="number"
            className={INPUT_STYLE}
            placeholder="원"
            {...register('startPrice')}
          />
          <p className={ERROR_STYLE}>{errors.startPrice?.message}</p>
        </div>
      </div>

      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>무게</label>

        <div className={WRAPPER_INPUT_STYLE}>
          <input
            type="number"
            className={INPUT_STYLE}
            placeholder="kg"
            {...register('kg')}
          />
          <p className={ERROR_STYLE}>{errors.kg?.message}</p>
        </div>
      </div>

      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>수량</label>
        <div className={WRAPPER_INPUT_STYLE}>
          <input className={INPUT_STYLE} placeholder="개" {...register('ea')} />
          <p className={ERROR_STYLE}>{errors.ea?.message}</p>
        </div>
      </div>

      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>경매 시작 시간</label>
        <div className={WRAPPER_INPUT_STYLE}>
          <input
            type="datetime-local"
            className={INPUT_STYLE}
            {...register('startDate')}
          />
          <p className={ERROR_STYLE}>{errors.startDate?.message}</p>
        </div>
      </div>
      {/* <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>경매 종료 시간</label>
        <div className={WRAPPER_INPUT_STYLE}>
          <input
            type="datetime-local"
            className={INPUT_STYLE}
            {...register('endDate')}
          />
          <p className={ERROR_STYLE}>{errors.endDate?.message}</p>
        </div>
      </div> */}
      <div className="text-center pb-6">
        <Button size="large" disabled={isSubmitting}>
          제출
        </Button>
      </div>
    </form>
  );
}
