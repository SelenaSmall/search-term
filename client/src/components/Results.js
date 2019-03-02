import React from 'react';
import { Link } from 'react-router-dom';

const Results = ({
  location: {
    state: { score },
  },
}) => (
  <div>
    <section id="middle-region">
      <div className="game-main-container text-center">
        <div>
          <h1 className="congratulations">Congratulations!</h1>
          <h2 className="final-score">
            You scored
            {score}
          </h2>

          <Link to="/" className="game-button">
            Home
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Results;
