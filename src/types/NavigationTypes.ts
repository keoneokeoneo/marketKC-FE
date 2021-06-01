export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type AppNavParamList = {
  Landing: NestedNavigatorParams<LandingParamList>;
  Main: NestedNavigatorParams<MainParamList>;
  Intro: undefined;
};

export type LandingParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainParamList = {
  Home: NestedNavigatorParams<HomeParamList>;
  Crypto: NestedNavigatorParams<CryptoParamList>;
  Posting: NestedNavigatorParams<PostingParamList>;
  Chat: NestedNavigatorParams<ChatParamList>;
  Profile: NestedNavigatorParams<ProfileParamList>;
};

export type HomeParamList = {
  Feed: undefined;
  Post: { id: number };
  Search: undefined;
  SetCategory: undefined;
  SetLocation: undefined;
};

export type CryptoParamList = {
  Chart: undefined;
};

export type PostingParamList = {
  UploadPost: undefined;
  SelectCategory: undefined;
  GalleryPermission: undefined;
};

export type ChatParamList = {
  ChatList: undefined;
  ChatRoom: { chatID: number; postID: number };
};

export type ProfileParamList = {
  ModifyProfile: undefined;
  UserProfile: { userID: string };
  MyPage: undefined;
  RegisterWallet: undefined;
  TradeList: { userID: string };
  TXList: { userID: string };
  SellList: { userID: string };
  RequestList: undefined;
};
