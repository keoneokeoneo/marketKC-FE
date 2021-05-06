import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
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

export interface ImagePickerProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PostingParamList, 'ImagePicker'>,
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
