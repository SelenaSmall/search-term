import React from 'react'
import {Link} from 'react-router-dom'

const Round = () => (
  <div>
    <Link to="/">Start Game</Link>
    <h3>Round <span className="round">1</span></h3>
  </div>
)

export default Round