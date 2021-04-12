import { POSTING_LOAD_ALBUMS } from '../actions/postingActionTypes';
import { PostingActions, PostingState } from '../types';

const initialState: PostingState = {
  albums: [{ title: '최근 항목', count: 0 }],
  formData: {
    category: '',
    content: '',
    title: '',
  },
  isFetching: true,
  pageInfo: {
    endCursor: '',
    hasNextPage: true,
    startCursor: '',
  },
  photos: [],
  params: {
    first: 200,
    assetType: 'Photos',
    include: ['filename', 'fileSize', 'imageSize'],
  },
};

export const postingReducer = (
  state: PostingState = initialState,
  action: PostingActions,
): PostingState => {
  switch (action.type) {
    case POSTING_LOAD_ALBUMS:
      return {
        ...state,
        albums: [...state.albums, ...action.albums],
      };
    default:
      return state;
  }
};
