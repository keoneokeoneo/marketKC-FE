import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AppNavParamList,
  ChatParamList,
  CryptoParamList,
  HomeParamList,
  LandingParamList,
  MainParamList,
  PostingParamList,
  ProfileParamList,
} from './NavigationTypes';

export interface IntroProps {
  navigation: StackNavigationProp<AppNavParamList, 'Intro'>;
}

export interface SignInProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<LandingParamList, 'SignIn'>,
    StackNavigationProp<AppNavParamList>
  >;
}

export interface SignUpProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<LandingParamList, 'SignUp'>,
    StackNavigationProp<AppNavParamList>
  >;
}

/* Home */
export interface FeedProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeParamList, 'Feed'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface SearchProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeParamList, 'Search'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface PostProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeParamList, 'Post'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
  route: RouteProp<HomeParamList, 'Post'>;
}

export interface SetCategoryProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeParamList, 'SetCategory'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface SetLocationProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeParamList, 'SetLocation'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

/* Crypto */
export interface ChartProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<CryptoParamList, 'Chart'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

/* Posting */
export interface UploadPostProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PostingParamList, 'UploadPost'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface GalleryPermissionProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PostingParamList, 'GalleryPermission'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface SelectCategoryProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PostingParamList, 'SelectCategory'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

/* Chat */
export interface ChatListProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ChatParamList, 'ChatList'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface ChatRoomProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ChatParamList, 'ChatRoom'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
  route: RouteProp<ChatParamList, 'ChatRoom'>;
}

/* Profile */
export interface MyPageProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'MyPage'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface UserProfileProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'UserProfile'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
  route: RouteProp<ProfileParamList, 'UserProfile'>;
}

export interface ModifyProfileProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'ModifyProfile'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface RegisterWalletProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'RegisterWallet'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}

export interface TradeListProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'TradeList'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
  route: RouteProp<ProfileParamList, 'TradeList'>;
}

export interface SellListProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'SellList'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
  route: RouteProp<ProfileParamList, 'SellList'>;
}

export interface TXListProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'TXList'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
  route: RouteProp<ProfileParamList, 'TXList'>;
}

export interface RequestListProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ProfileParamList, 'RequestList'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}
