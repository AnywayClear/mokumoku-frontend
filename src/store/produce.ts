import { atom } from 'recoil';

export const filterState = atom<string>({
  key: 'filter',
  default: '0',
});
