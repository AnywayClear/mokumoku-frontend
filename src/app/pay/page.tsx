'use client';
import axios from 'axios';
import PayImage from '../../../public/images/payment_icon_yellow_small.png';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getPoint } from '@/service/api/produce';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/Button';
import { toast } from 'react-toastify';
import { patch } from '@/service/api/http';

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

const WRAPPER_INPUT_STYLE = '';

const WRAPPER_STYLE = 'flex gap-4 my-4 justify-center';

const ERROR_STYLE = 'text-red-500 h-4 text-xs';

type Point = {
  balance: number;
};
export default function PayPage() {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();

  const { data: point }: UseQueryResult<Point> = useQuery({
    queryKey: ['point'],
    queryFn: () => getPoint(user?.userId ?? ''),
    enabled: !!user?.userId,
  });
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: Point) => {
      return patch(`/api/points/${user?.userId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['point'] });
    },
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get('pg_token')) {
      toast.success('포인트 충전에 성공했습니다.');
    }
  }, [searchParams]);

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
    params.append(
      'approval_url',
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pay`,
    );
    params.append('cancel_url', `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pay`);
    params.append('fail_url', `${process.env.NEXT_PUBLIC_FRONTEND_URL}/pay`);

    axios
      .post('https://kapi.kakao.com/v1/payment/ready', params, {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADMIN_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => {
        mutation.mutate({
          balance: data.money,
        });
        return res;
      })
      .then((res) => {
        router.push(res.data.next_redirect_pc_url);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
        결제하기
      </h2>
      <div>
        <p className="text-sm font-semibold leading-6 text-gray-900 pt-2">
          {`현재 포인트 : ${point?.balance}`}
        </p>
      </div>

      <div className="flex gap-2">
        <div>
          <Image alt="pay" src={PayImage} />
        </div>
        {[5000, 10000, 20000, 50000].map((charge, index) => (
          <Button
            key={index}
            size="small"
            variant="fourthly"
            onClick={() => setValue('money', charge)}
          >
            {charge}
          </Button>
        ))}
      </div>

      <form className="flex flex-col w-9/12" onSubmit={handleSubmit(onSubmit)}>
        <div className={WRAPPER_STYLE}>
          <p className="text-sm font-semibold leading-6 text-gray-900 pt-2">
            충전 금액
          </p>

          <div className={WRAPPER_INPUT_STYLE}>
            <input
              type="number"
              className={INPUT_STYLE}
              placeholder="금액"
              {...register('money')}
            />
            <p className={ERROR_STYLE}>{errors.money?.message}</p>
          </div>
        </div>
        <div className="text-center pb-6">
          <Button size="large" variant="fourthly" disabled={isSubmitting}>
            충전하기
          </Button>
        </div>
      </form>
    </div>
  );
}
