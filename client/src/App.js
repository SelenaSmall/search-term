import React, { Component } from 'react';
import Game from './components/Game'
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
    );
    }
}

export default App;