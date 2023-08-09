'use client';
import axios from 'axios';
import PayImage from '../../../public/images/payment_icon_yellow_small.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    money: yup
      .number()
      .min(1, '충전금액은 1000원 이상이어야 합니다.')
      .required('충전금액은 1000원 이상이어야 합니다.')
      .typeError('충전금액을 입력해주세요.'),
  })
  .required();

type Inputs = {
  money: number;
};

const LABEL_STYLE = 'leading-loose text-left block text-black text-sm w-3/12';
const INPUT_STYLE =
  'block box-border rounded-md w-full border-2 border-solid border-black py-2 px-3 text-sm text-black';

const WRAPPER_INPUT_STYLE = 'w-9/12';

const WRAPPER_STYLE = 'flex gap-4 my-4';

const ERROR_STYLE = 'text-red-500 h-4 text-xs';

export default function PayPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const money = data.money + '';
    const params = new URLSearchParams();
    params.append('cid', 'TC0ONETIME');
    params.append('partner_order_id', '12');
    params.append('partner_user_id', '1212');
    params.append('item_name', 'money');
    params.append('quantity', '1');
    params.append('total_amount', money);
    params.append('tax_free_amount', money);
    params.append('approval_url', 'http://localhost:3000/pay');
    params.append('cancel_url', 'http://localhost:3000/pay');
    params.append('fail_url', 'http://localhost:3000/pay');

    axios
      .post('https://kapi.kakao.com/v1/payment/ready', params, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        console.log(res);
        // window.open(res.data.next_redirect_pc_url);
        router.push(res.data.next_redirect_pc_url);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
        결제하기
      </h2>
      <Image alt="pay" src={PayImage} />
      <form className="flex flex-col w-9/12" onSubmit={handleSubmit(onSubmit)}>
        <div className={WRAPPER_STYLE}>
          <label className={LABEL_STYLE}>내용</label>
          <div className={WRAPPER_INPUT_STYLE}>
            <input
              className={INPUT_STYLE}
              placeholder="금액"
              {...register('money')}
            />
            <p className={ERROR_STYLE}>{errors.money?.message}</p>
          </div>
        </div>
        <input className="cursor-pointer" type="submit" value="submit" />
      </form>
    </div>
  );
}
