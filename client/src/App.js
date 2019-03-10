import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Footer from './components/Footer';
import Navigation from './components/Navigation';

export default () => (
  <div>
    <BrowserRouter>
      <>
        <Navigation />
        <Routes />
      </>
    </BrowserRouter>
    <Footer />
  </div>
);
