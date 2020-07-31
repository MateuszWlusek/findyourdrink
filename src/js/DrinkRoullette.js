import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
const DrinkRoulette = () => {
  const API = "http://localhost:3005/drinks/";

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

  const handlers = useSwipeable({
    onSwipedLeft: () => console.log("SwipedLeft"),
    onSwipedRight: () => console.log("SwipedRight"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
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
            <NavLink to="/search">Wyszukiwanie drinka</NavLink>
          </li>
        </ul>
      </nav>
      <div className="roll-content">
        <h2>Wylosuj drinka</h2>
        <img src="../img/cocktail-2634115_640_cut_colored.png" />
        <div {...handlers}>
          <button className="btn-acc">Napiję się</button>
          <button className="btn-ref">Nie chcę. Losuj dalej</button>
        </div>
      </div>
    </>
  );
};

export default DrinkRoulette;
