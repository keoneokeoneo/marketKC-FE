export type NestedNavigatorParams<ParamList> = {
  [K in keyof ParamList]: undefined extends ParamList[K]
    ? { screen: K; params?: ParamList[K] }
    : { screen: K; params: ParamList[K] };
}[keyof ParamList];

export type AppNavParamList = {
  Landing: NestedNavigatorParams<LandingParamList>;
  //Main: NestedNavigatorParams<MainParamList>;
};

export type LandingParamList = {
  //Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
};
