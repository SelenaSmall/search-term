import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../API'

class Round extends Component {
  constructor(props) {
    super(props);
    this.state = { round: 1, images: [], status: 'LOADING ...' }
    this.fetchRoundData()
  }

  fetchRoundData() {
    const { round } = this.state;
    API.fetchRoundData(round).then((data) => {
      this.setState(data)
      this.setState({status: 'IN-PROGRESS'})
    })
  }

  render() {
    return(
      <div>
        <Link to="/">Start Game</Link>
        <h3>Round <span className="round">1</span></h3>
        <span className="status">{this.state.status}</span>
        <div>
          { this.state.images.map( ({id, src}) => (<img className="image" key={id} src={src} alt="nice try"/>))}
        </div>
        <div>
          <input className="guess"></input>
        </div>
      </div>
    )
  }
}

export default Round