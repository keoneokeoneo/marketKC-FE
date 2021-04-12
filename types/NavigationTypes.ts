export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type AppNavParamList = {
  Landing: NestedNavigatorParams<LandingParamList>;
  Main: NestedNavigatorParams<MainParamList>;
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
  Post: undefined;
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
  ImagePicker: undefined;
  GalleryPermission: undefined;
};

export type ChatParamList = {
  ChatList: undefined;
  ChatRoom: undefined;
};

export type ProfileParamList = {
  Dibs: undefined;
  Sales: undefined;
  Purchases: undefined;
  Wallet: undefined;
  ProfileModification: undefined;
  UserProfile: undefined;
  MyPage: undefined;
};
