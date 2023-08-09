import { searchType } from '@/model/mypage';
import dayjs, { Dayjs } from 'dayjs';
import {atom, selector} from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tapState = atom<number>({
    key:'tapState',    
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

export const searchState = atom<searchType>({
    key:'searchState',    
    default: {
        title: null,
        auctionState: null,
        dateState: null,
        startDate: '',
        endDate : '',
        orderBy : '',
    },
    effects_UNSTABLE: [persistAtom],
});

type test={
    formattedStartDate:Dayjs|null,
    formattedEndDate:Dayjs|null
}
export const dateSelector = selector<test>({
    key: 'dateSelector',

    get: ({ get }) => {
      const search:searchType = get(searchState);
      var formattedStartDate = null;
      var formattedEndDate = null;

      if(search.startDate !== null){
        formattedStartDate = dayjs(search.startDate);
      }
      if(search.endDate !== null){
        formattedEndDate = dayjs(search.endDate);
      }
      return {
        formattedStartDate: formattedStartDate,
        formattedEndDate : formattedEndDate
      };
    },

});