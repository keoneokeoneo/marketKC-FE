import { CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavParamList, LandingParamList } from './NavigationTypes';

export interface ISignIn {
  navigation: CompositeNavigationProp<
    StackNavigationProp<LandingParamList, 'SignIn'>,
    StackNavigationProp<AppNavParamList>
  >;
}

export interface ISignUp {
  navigation: CompositeNavigationProp<
    StackNavigationProp<LandingParamList, 'SignUp'>,
    StackNavigationProp<AppNavParamList>
  >;
}
