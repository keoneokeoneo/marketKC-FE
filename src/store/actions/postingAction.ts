import { Dispatch } from 'react';
import { CATEGORIES } from '../../constants';
import { PositngDispatch, POSTING_SELECT_CATEGORY } from './postingActionTypes';

export const selectCategory = (id: number) => {
  const category = CATEGORIES.find(el => el.id === id);
  if (category) {
    return {
      type: POSTING_SELECT_CATEGORY,
      category: category,
    };
  } else {
    return {
      type: POSTING_SELECT_CATEGORY,
      category: {
        id: 0,
        name: '카테고리를 선택하세요',
      },
    };
  }
};

export type PostingActions = ReturnType<typeof selectCategory>;
