import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './components/Router';
import { Provider } from 'react-redux';
import store from './components/Store/store';
import AutoLogin from './components/User/AutoLogin'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AutoLogin>
      <RouterProvider router={router}/>
    </AutoLogin>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();