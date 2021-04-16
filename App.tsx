import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Provider } from 'react-redux';
import AppNav from './src/navigations/AppNav';
import store from './src/store';

const App = () => {
  //AsyncStorage.clear();
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default App;
