import { string } from 'yup/lib/locale';

type User = {
  id: string; // 유저 id. uuid를 기준으로 생성됨
  name: string; // 유저 닉네임
  email: string; // 유저 이메일. 로그인시 아이디로 사용됨
  pw: string; //유저 패스워드
  createdAt: Date; // 계정 생성 날짜
  updatedAt: Date; // 정보 수정된 날짜
  lastLogin: Date; // 마지막 활동 날짜. JWT 토큰 확인한 시간 기준
  walletAddr: string; // 이더리움 지갑 주소
  location: string; // 마지막 인증 지역
};

type Chat = {
  id: number | string; // primaray key. auto increment?
  postID: number | string; // 어떤 거래글에 해당하는 채팅인지 구별
  sellerID: string; // 파는 사람 id.
  buyerID: string; // 사는 사람 id.
  // 두개의 id중 하나는 유저 본인임. 즉 본인이 아닌 유저에 해당하는 데이터를 id를 기준으로 다 가져와야함.
};
