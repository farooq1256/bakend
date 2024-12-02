// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'; 
import store from './store';
import { Toaster } from './components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <Toaster/>
      <App />
    </BrowserRouter>
  </Provider>
);
