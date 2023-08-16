import AuctionStateSetter from './AuctionStateSetter';
import DateSetter from './DateSetter';
import NameSetter from './NameSetter';
import OrderSetter from './OrderSetter';

type Props = {
  tabType: number;
  hasAuctionState: boolean;
  hasDateState: boolean;
  hasNameState: boolean;
  hasOrderState: boolean;
  auctionType?: number;
};

export default function SearchTab({
  tabType,
  hasAuctionState,
  hasDateState,
  hasOrderState,
  hasNameState,
  auctionType,
}: Props) {
  if (tabType == 0) {
    return (
      <div className="mt-12 mb-4">
        {(hasAuctionState  && auctionType!=null)? <AuctionStateSetter auctionType={auctionType} /> : null}
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            {hasDateState ? <DateSetter /> : null}
            {hasNameState ? <NameSetter /> : null}
          </div>
          {hasOrderState ? <OrderSetter /> : <p className='mt-8'>&nbsp;</p>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-end">
        {hasNameState ? <NameSetter /> : null}
        {hasOrderState ? <OrderSetter /> : null}
      </div>
    );
  }
}
