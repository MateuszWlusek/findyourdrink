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
      <nav className="nav-mainpage">
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
          <li>
            <NavLink to="/add">Dodawanie drinka</NavLink>
          </li>
          <li>
            <NavLink to="/roulette">Wylosuj drinka</NavLink>
          </li>
        </ul>
      </nav>
      <div className="search-content">
        <h2>Wyszukaj drinka</h2>
        <div className="search-box">
          <section className="ingredients">
            <div className="ingredients_base">
              <p>Alkohol bazowy</p>
              <select>
                {base.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div className="ingredients_others">
              <p>Pozostałe składniki</p>
              <select>
                {ingr.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>
        <div className="drinks-found">
          <p>Lista drinków</p>
          <ul className="list-found">
            {drinks?.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchDrink;
