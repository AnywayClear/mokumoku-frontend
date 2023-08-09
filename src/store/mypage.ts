import { searchType } from '@/model/mypage';
import {atom} from 'recoil';
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
        startDateStr: '',
        endDateStr : '',
        orderBy : '',
    },
    effects_UNSTABLE: [persistAtom],
});
