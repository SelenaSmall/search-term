import React, { Component } from 'react';
import './Airport.css';

export default class Airport extends Component {
  constructor(props) {
    super(props);
    this.state = { gun: 'h-1' };
    this.loadGun = this.loadGun.bind(this);
  }

  loadGun() {
    this.setState({ gun: 'h-32' });
  }

  render() {
    const { gun } = this.state;
    return (
      <div>
        <section id="middle-region">
          <div className="game-main-container text-center">
            <div className="flex -mx-2">
              <section id="middle-region" className="flex-1 w-1/4 px-2">
                <div>
                  <strong className="text-5xl">
                    ARE YOU CARRYING ANY GUNS?
                  </strong>
                </div>
                <div>
                  <img
                    src="/gun_icon.png"
                    id="gun"
                    className={gun}
                    alt="gun icon"
                  />
                </div>
                <ul>
                  <li className="list-reset">
                    <button
                      className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded min-w-full mb-1 h-32"
                      value="YES"
                      type="button"
                    >
                      YES
                    </button>
                    <button
                      id="no"
                      className="bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded min-w-full mb-1 h-32"
                      onMouseEnter={this.loadGun}
                      value="NO"
                      type="button"
                    >
                      NO
                    </button>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
