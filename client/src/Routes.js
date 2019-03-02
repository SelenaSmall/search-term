import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import Round from './components/Round';
import PreRound from './components/PreRound';
import Results from './components/Results';
import Airport from './components/Airport';
import Match from './components/Match';

export default () => (
  <Switch>
    <Route exact path="/" component={Game} />
    <Route exact path="/game/:gameName/pre-round" component={PreRound} />
    <Route exact path="/game/:gameName/match/:matchId" component={Match} />
    <Route exact path="/game/:gameName/round/:round" component={Round} />
    <Route exact path="/results" component={Results} />
    <Route exact path="/airport" component={Airport} />
  </Switch>
);
