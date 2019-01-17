import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import Round from './components/Round';
import Results from './components/Results';
import Airport from './components/Airport';

export default () => (
  <Switch>
    <Route exact path="/" component={Game} />
    <Route exact path="/game/:gameName/round/:round" component={Round} />
    <Route exact path="/results" component={Results} />
    <Route exact path="/airport" component={Airport} />
  </Switch>
);
