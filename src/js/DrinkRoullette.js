import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
const DrinkRoulette = () => {
  const API = "http://localhost:3005/drinks/";

  const [base, setBase] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [drinkId, setDrinkId] = useState([]);
  const [rolledDrink, setRolledDrink] = useState([]);
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
    onSwipedLeft: () =>
      setRolledDrink(
        drinks[Math.floor(Math.random() * (drinks.length - 0)) + 0].name
      ),
    onSwipedRight: () =>
      setRolledDrink(
        drinks[Math.floor(Math.random() * (drinks.length - 0)) + 0].name
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const handleDrinkId = () => {
    setDrinkId(Math.floor(Math.random() * (drinks.length - 0)) + 0);
  };
  const handleDrinkRoll = () => {
    setRolledDrink(drinks[drinkId].name);
  };
  const handleChangeClass = (e) => {
    e.target.parentElement.previousSibling.children[1].className ==
    "preparation-hidden"
      ? (e.target.parentElement.previousSibling.children[1].className =
          "preparation-show")
      : (e.target.parentElement.previousSibling.children[1].className =
          "preparation-hidden");
    e.target.nextSibling.classList == "btn-ref"
      ? (e.target.nextSibling.className = "btn-ref hide")
      : (e.target.nextSibling.className = "btn-ref");
    e.target.previousSibling.classList == "btn-roll"
      ? (e.target.previousSibling.className = "btn-roll hide")
      : (e.target.previousSibling.className = "btn-roll");
  };

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
        <img
          className="roll-img"
          src="../img/cocktail-2634115_640_cut_colored.png"
        />
        <div className="rolledDrink">
          <span>{rolledDrink}</span>
          <div className="preparation-hidden">
            <p className="drinkPrep">Przygotowanie</p>
            <p>Potrzebne składniki:</p>
            <ul>
              {drinks[drinkId]?.quantity.map((el) => {
                return (
                  <li key={Math.floor(Math.random() * (999999 - 1)) + 1}>
                    {el}
                  </li>
                );
              })}
            </ul>
            <p>A teraz krok po kroku</p>
            <ul>
              {drinks[drinkId]?.preparation.map((el) => {
                return (
                  <li key={Math.floor(Math.random() * (999999 - 1)) + 1}>
                    {el}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="btns" {...handlers}>
          <button
            className="btn-roll"
            onMouseEnter={handleDrinkId}
            onClick={handleDrinkRoll}>
            Losuj drinka
          </button>
          <button className="btn-acc" onClick={handleChangeClass}>
            Napiję się / Schowaj przepis
          </button>
          <button
            className="btn-ref"
            onMouseEnter={handleDrinkId}
            onClick={handleDrinkRoll}>
            Nie chcę. Losuj dalej
          </button>
        </div>
      </div>
    </>
  );
};

export default DrinkRoulette;
