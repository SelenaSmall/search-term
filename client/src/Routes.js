import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Game from './components/Game'
import Round from './components/Round'

export default () =>(
    <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/round/:round" component={Round} />
    </Switch>
)