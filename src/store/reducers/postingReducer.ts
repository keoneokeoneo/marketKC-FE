import { PostingActions } from '../actions/postingAction';
import { POSTING_SELECT_CATEGORY } from '../actions/postingActionTypes';
import { PostingState } from '../types';

const initialState: PostingState = {
  formData: {
    category: {
      id: 0,
      name: '카테고리를 선택하세요',
    },
    content: '',
    title: '',
  },
};

export const postingReducer = (
  state: PostingState = initialState,
  action: PostingActions,
): PostingState => {
  switch (action.type) {
    case POSTING_SELECT_CATEGORY:
      return {
        ...state,
        formData: {
          ...state.formData,
          category: action.category,
        },
      };
    default:
      return state;
  }
};
