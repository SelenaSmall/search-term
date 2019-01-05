import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import Round from './components/Round';
import Results from './components/Results';

export default () => (
  <Switch>
    <Route exact path="/" component={Game} />
    <Route exact path="/game/:gameName/round/:round" component={Round} />
    <Route exact path="/results" component={Results} />
  </Switch>
);
