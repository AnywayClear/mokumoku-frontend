import {atom} from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tapState = atom<number>({
    key:'tapState',    
    default: 0,
    effects_UNSTABLE: [persistAtom],
});