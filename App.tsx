import React from 'react';
import { Provider } from 'react-redux';
import AppNav from './src/navigations/AppNav';
import store from './src/store';
import io from 'socket.io-client';
import Toast from 'react-native-simple-toast';

export const socket = io.connect('ws://127.0.0.1:81/s-marcet', {
  jsonp: false,
  transports: ['websocket'],
});

const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default App;
