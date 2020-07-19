import React from "react";
import { NavLink } from "react-router-dom";
const DrinkRoulette = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
        </ul>
      </nav>
      <h1>Wylosuj drinka</h1>
    </>
  );
};

export default DrinkRoulette;
