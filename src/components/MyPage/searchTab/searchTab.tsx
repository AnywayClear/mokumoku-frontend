import AuctionStateSetter from './AuctionStateSetter';
import DateSetter from './DateSetter';
import NameSetter from './NameSetter';
import OrderSetter from './OrderSetter';

type Props = {
  tabType: number;
};

export default function SearchTab({ tabType }: Props) {
  if (tabType <= 2) {
    return (
      <div className="mt-12 mb-4">
        {tabType <= 1 ? <AuctionStateSetter tabType={tabType} /> : null}
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <DateSetter />
            <NameSetter />
          </div>
          <OrderSetter />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-end">
        <NameSetter />
        <OrderSetter />
      </div>
    );
  }
}
