import React from 'react';
import { Provider } from 'react-redux';
import AppNav from './src/navigations/AppNav';
import store from './src/store';
import io from 'socket.io-client';
import Toast from 'react-native-simple-toast';

export const socket = io.connect('http://127.0.0.1:81/market-kc-chat', {
  jsonp: false,
  transports: ['websocket'],
});
socket.on('roomCreationSuccess', (res: any) => {
  console.log(res);
  Toast.show(res, Toast.SHORT, ['UIAlertController']);
});

socket.on('roomCreationError', (res: any) => {
  console.log(res);
  Toast.show(res, Toast.SHORT, ['UIAlertController']);
});

socket.on('connectionSuccess', (res: any) => {
  console.log(res);
  Toast.show(res, Toast.SHORT, ['UIAlertController']);
});
socket.on('test 1 ', (res: any) => {
  console.log(res);
  Toast.showWithGravity(res, Toast.LONG, Toast.CENTER, ['UIAlertController']);
});
socket.on('test 2', (res: any) => {
  console.log(res);
  Toast.showWithGravity(res, Toast.LONG, Toast.TOP, ['UIAlertController']);
});
const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default App;
