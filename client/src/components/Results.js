import React from 'react'
import {Link } from 'react-router-dom'

const Results = ({location: { state: { score }} }) => (
  <div>
    <div className="congratulations">
      Congratulations!
    </div>
    <div className="final-score">{score}</div>
    <Link to='/'>home</Link>
  </div>
)

export default Results