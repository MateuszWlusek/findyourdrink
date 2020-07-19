import React from "react";
import { NavLink } from "react-router-dom";
const SearchDrink = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
        </ul>
      </nav>
      <h1>Wyszukaj drinka</h1>
    </>
  );
};

export default SearchDrink;
