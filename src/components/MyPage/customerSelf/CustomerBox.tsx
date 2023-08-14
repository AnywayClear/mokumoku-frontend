import { useRecoilState } from 'recoil';
import BoughtList from './BoughtList/BoughtList';
import SubscribeList from './SubscribeList/SubscribeList';
import WishList from './WishList/WishList';
import { tapState } from '@/store/mypage';

const boxItems = [
  {
    tag: <BoughtList key="0"/>,
    number: 0,
  },
  {
    tag: <WishList key="1"/>,
    number: 1,
  },
  {
    tag: <SubscribeList key="2"/>,
    number: 2,
  },
];

type Props = {
  boxItemNum: number;
};

export default function CustomerBox() {
  const [status, setStatus] = useRecoilState<number>(tapState);

  return (
    <div className="border-neutral-500 mb-32">
      {boxItems.map((boxItem, index) =>
        status === boxItem.number ? boxItem.tag : null,
      )}
    </div>
  );
}
