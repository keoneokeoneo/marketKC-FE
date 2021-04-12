import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  AppNavParamList,
  HomeParamList,
  LandingParamList,
  MainParamList,
} from './NavigationTypes';

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

export interface FeedProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<HomeParamList, 'Feed'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainParamList>,
      StackNavigationProp<AppNavParamList>
    >
  >;
}
