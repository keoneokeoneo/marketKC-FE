import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GalleryPermission from '../screens/Main/Posting/GalleryPermission';
import ImagePicker from '../screens/Main/Posting/ImagePicker';
import SelectCategory from '../screens/Main/Posting/SelectCategory';
import UploadPost from '../screens/Main/Posting/UploadPost';
import { PostingParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<PostingParamList>();

const PostingNav = () => {
  return (
    <Stack.Navigator initialRouteName="UploadPost">
      <Stack.Screen name="UploadPost" component={UploadPost} />
      <Stack.Screen name="ImagePicker" component={ImagePicker} />
      <Stack.Screen name="GalleryPermission" component={GalleryPermission} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
    </Stack.Navigator>
  );
};

export default PostingNav;
