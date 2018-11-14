import React from 'react';

export default () => (
  <section id="top-region">
    <menu className="status-menu">
      <ul>
        <li className="status-menu-item status">
          <span className="status-menu-item-label">Status</span>
          <span className="status-menu-item-value"></span>
        </li>
        <li className="status-menu-item score">
          <span className="status-menu-item-label">Score</span>
          <span className="status-menu-item-value"></span>
        </li>
        <li className="status-menu-item timer">
          <span className="status-menu-item-label">Time</span>
          <span className="status-menu-item-value"></span>
        </li>
      </ul>
    </menu>
  </section>
);
