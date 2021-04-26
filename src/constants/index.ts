import { Category } from '../store/types';
import { IFeedItem } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: '패션의류',
  },
  {
    id: 2,
    name: '패션잡화',
  },
  {
    id: 3,
    name: '뷰티/미용',
  },
  {
    id: 4,
    name: '출산/유아동',
  },
  {
    id: 5,
    name: '디지털/가전',
  },
  {
    id: 6,
    name: '리빙/생활',
  },
  {
    id: 7,
    name: '게임/취미',
  },
  {
    id: 8,
    name: '스포츠/레저',
  },
  {
    id: 9,
    name: '반려동물용품',
  },
  {
    id: 10,
    name: '도서/티켓/음반',
  },
  {
    id: 11,
    name: '기타 중고물품',
  },
  {
    id: 12,
    name: '무료나눔',
  },
];

const dummyData: IFeedItem[] = [];

for (let i = 0; i < 30; i++) {
  const tmp: IFeedItem = {
    id: i.toString(),
    thumbnailUri: 'https://picsum.photos/600/600/?random',
    title: `판매글 ${i}`,
    location: '위치 정보',
    date: `작성 시간`,
    price: Math.floor(Math.random() * 100 + 1) * 1000,
    chats: Math.floor(Math.random() * 10),
    likes: Math.floor(Math.random() * 10),
    status: 'ㅁㅁㅁㅁ',
  };
  dummyData.push(tmp);
}

export { dummyData };
