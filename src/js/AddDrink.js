import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const API = "http://localhost:3005/drinks/";

const AddDrink = () => {
  const [base, setBase] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [ingrList, setIngrList] = useState([]);
  const [drinkIngr, setDrinkIngr] = useState([]);
  const [instr, setInstr] = useState("");
  const [instrList, setInstrList] = useState([]);

  useEffect(() => {
    fetch(`${API}`)
      .then((res) => res.json())
      .then((data) => {
        setBase(data.bases);
        setIngr(data.allingr);
      });
  }, []);
  const addToList = (e) => {
    setIngrList([e.target.value]);
  };
  const addIngredient = (e) => {
    e.preventDefault();
    setDrinkIngr((prev) => [...prev, ingrList]);
  };
  const stepList = (e) => {
    setInstr(e.target.value);
  };

  const addStep = (e) => {
    e.preventDefault();
    setInstrList((prev) => [...prev, instr]);
    console.log(instrList);
  };
  return (
    <>
      <nav className="nav-mainpage">
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
          <li>
            <NavLink to="/roulette">Wylosuj drinka</NavLink>
          </li>
          <li>
            <NavLink to="/search">Wyszukiwanie drinka</NavLink>
          </li>
        </ul>
      </nav>
      <div className="add-content">
        <h2>Dodaj drinka</h2>
        <form>
          <p>Podaj nazwę drinka</p>
          <input type="text" />
          <p>Wybierz alkohol bazowy</p>
          <select>
            {base.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <p>Wybierz dodatkowe składniki</p>
          <select onChange={addToList}>
            {ingr.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <p>Dodaj swój składnik, jeśli nie ma go na liście</p>
          <input type="text" />
          <button className="btn-addbase">Dorzuć swój składnik do bazy</button>
          <p>Dodaj składnik do listy</p>
          <ul>
            {ingrList.map((el) => (
              <li>
                <input type="number" name="quan" />
                <span>ml - </span>
                <span>{el}</span>
                <button className="btn-addingr" onClick={addIngredient}>
                  Dodaj składnik
                </button>
              </li>
            ))}
          </ul>
          <p>Lista składników</p>
          <ul>
            {drinkIngr.map((el) => {
              return <li>ml - {el}</li>;
            })}
          </ul>
          <div className="text-form">
            <textarea
              type="text"
              placeholder="Krok po roku dodaj instrukcję"
              cols="40"
              rows="2"
              onChange={stepList}
            />
            <button className="btn-addstep" onClick={addStep}>
              Dodaj krok
            </button>
          </div>

          <ul>
            {instrList.map((e) => {
              return <li>{e}</li>;
            })}
          </ul>
          <button className="btn-adddrink" type="submit">
            Dodaj drinka!
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDrink;
