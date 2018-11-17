import React from 'react';

export default () => (
  <section id="bottom-region" className="md:fixed">
    <menu className="twitter-menu">
      <ul>
        <li className="twitter-menu-item twitter-menu-item-left status">
          <a href="http://twitter.com/intent/user?screen_name=selenasmall88">
            <img className="twitter-menu-item-avatar" src="/avatar-selena.jpg" alt="selena-small" />
            <span>@selenasmall88</span>
          </a>
        </li>
        <li className="twitter-menu-item status">
          <a href="http://twitter.com/intent/user?screen_name=saramic">
            <img className="twitter-menu-item-avatar" src="/avatar-michael.jpg" alt="michael-milewski" />
            <span>@saramic</span>
          </a>
        </li>
      </ul>
    </menu>
  </section>
);
