import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Footer from './components/Footer';

export default () => (
  <div>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <Footer />
  </div>
);
