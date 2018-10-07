import React, { Component } from 'react';
import Game from './components/Game'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Game />
            </div>
    );
    }
}

export default App;