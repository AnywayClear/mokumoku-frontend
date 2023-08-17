import AuctionList from './AuctionList/AuctionList';
import AuctionChart from './AuctionChart';
import ReviewList from './ReviewList/ReviewList';
import { useRecoilState } from 'recoil';
import { tapState } from '@/store/mypage';
const boxItems = [
  {
    tag: <AuctionList key={0} />,
    number: 0,
  },
  {
    tag: <AuctionChart key={1}/>,
    number: 1,
  },
  {
    tag: <ReviewList key={2}/>,
    number: 2,
  },
];

export default function SellerBox() {
  const [status] = useRecoilState<number>(tapState);
  return (
    <div className="my-4">
      {boxItems.map((boxItem) =>
        status === boxItem.number ? boxItem.tag : null,
      )}
    </div>
  );
}
