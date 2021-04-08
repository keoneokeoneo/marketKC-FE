import React from 'react';
import { Provider } from 'react-redux';
import AppNav from './navigations/AppNav';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

export default App;
