import React from 'react';
import { Provider } from 'react-redux';
import AppNav from './src/navigations/AppNav';
import store from './src/store';
import io from 'socket.io-client';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOCKET_URL } from './src/config';

export const socket = io.connect(SOCKET_URL, {
  jsonp: false,
  transports: ['websocket'],
});

const App = () => {
  //AsyncStorage.clear();
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default App;
