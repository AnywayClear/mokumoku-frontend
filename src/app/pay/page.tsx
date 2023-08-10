'use client';
import axios from 'axios';
import PayImage from '../../../public/images/payment_icon_yellow_small.png';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PayPage() {
  const [money, setMoney] = useState<string>('0');

  const router = useRouter();
  const handleClick = () => {
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMoney(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
        결제하기
      </h2>

      <input type="number" value={money} onChange={onChange} />
      <Image alt="pay" src={PayImage} onClick={handleClick} />
    </div>
  );
}
