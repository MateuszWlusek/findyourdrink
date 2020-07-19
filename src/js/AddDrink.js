import React from "react";
import { NavLink } from "react-router-dom";
const AddDrink = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
        </ul>
      </nav>
      <h1>Dodaj drinka</h1>
    </>
  );
};

export default AddDrink;
