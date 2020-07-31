import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const API = "http://localhost:3005/drinks/";

const SearchDrink = () => {
  const [base, setBase] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [drinks, setDrinks] = useState([]);
  useEffect(() => {
    fetch(`${API}`)
      .then((res) => res.json())
      .then((data) => {
        setBase(data.bases);
        setIngr(data.allingr);
        setDrinks(data.drink);
      });
  }, []);
  console.log(drinks[1]);
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
      <form>
        <select>
          {base.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select>
          {ingr.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <ul>
          Lista drinków
          {drinks?.map((e) => (
            <li key={e.id}>{e.name}</li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default SearchDrink;
