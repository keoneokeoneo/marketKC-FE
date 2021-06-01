import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import PressableIcon from '../../../components/PressableIcon';
import { SearchProps } from '../../../types/ScreenProps';

const Search = ({ navigation }: SearchProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      header: props => <View />,
    });
  }, [navigation]);

  return <View />;
};

const styles = StyleSheet.create({});

export default Search;
