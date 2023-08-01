'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup
      .string()
      .max(30, '최대 30자까지 입력 가능합니다.')
      .required('제목을 입력하세요.'),
    image: yup.string().max(30, '최대 30자까지 입력 가능합니다.').required(),
    desc: yup
      .string()
      .max(30, '최대 30자까지 입력 가능합니다.')
      .required('상품 설명을 입력하세요.'),
    startPrice: yup
      .number()
      .min(1, '시작 가격은 1원 이상이어야 합니다.')
      .required('필수 입력 항목입니다.'),
    kg: yup
      .number()
      .min(9, '최소 9 글자를 입력해야 합니다.')
      .max(16, '최대 16자까지 입력 가능합니다.')
      .required('무게는 1kg 이상이어야 합니다.'),
    startDate: yup.date().required('필수 입력 항목입니다.'),
    endDate: yup.date().required('필수 입력 항목입니다.'),
    ea: yup
      .number()
      .min(9, '최소 9 글자를 입력해야 합니다.')
      .max(16, '최대 16자까지 입력 가능합니다.')
      .required('수량은 1개 이상이어야 합니다.'),
  })
  .required();

type Inputs = {
  name: string;
  image: string;
  desc: string;
  startPrice: number;
  kg: number;
  startDate: Date;
  endDate: Date;
  ea: number;
};

const LABEL_STYLE = 'leading-loose text-left block text-black text-sm w-3/12';
const INPUT_STYLE =
  'block box-border rounded-md w-full border-2 border-solid border-black py-2 px-3 text-sm text-black';

const WRAPPER_INPUT_STYLE = 'w-9/12';

const WRAPPER_STYLE = 'flex gap-4 my-4';

const ERROR_STYLE = 'text-red-500 h-4 text-xs';

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    // defaultValues: {
    //   name: '',
    //   image: '',
    //   desc: '',
    //   startPrice: 0,
    //   kg: 0,
    //   startDate: '0000-00-00T00:00:00',
    //   endDate: '0000-00-00T00:00:00',
    //   ea: 0,
    // },
    resolver: yupResolver(schema),
  });

  //   console.log(watch());
  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <form className="flex flex-col w-9/12" onSubmit={handleSubmit(onSubmit)}>
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
            {...register('desc')}
          />
          <p className={ERROR_STYLE}>{errors.desc?.message}</p>
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
            type="date"
            className={INPUT_STYLE}
            {...register('startDate')}
          />
          <p className={ERROR_STYLE}>{errors.startDate?.message}</p>
        </div>
      </div>
      <div className={WRAPPER_STYLE}>
        <label className={LABEL_STYLE}>경매 종료 시간</label>
        <div className={WRAPPER_INPUT_STYLE}>
          <input type="date" className={INPUT_STYLE} {...register('endDate')} />
          <p className={ERROR_STYLE}>{errors.endDate?.message}</p>
        </div>
      </div>
      {/* {Object.keys(errors).length !== 0 && ( */}
      <input className="cursor-pointer" type="submit" value="submit" />
      {/* )} */}
    </form>
  );
}