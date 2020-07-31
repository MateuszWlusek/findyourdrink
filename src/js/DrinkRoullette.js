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
      <nav>
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
        </ul>
      </nav>
      <h1>Wylosuj drinka</h1>
      <img src="../img/cocktail-2634115_640.jpg" />
      <div {...handlers}>
        <button>Napiję się</button>
        <button>Nie chcę. Losuj dalej</button>
      </div>
    </>
  );
};

export default DrinkRoulette;
