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
      <nav>
        <ul>
          <li>
            <NavLink to="/">Strona główna</NavLink>
          </li>
        </ul>
      </nav>
      <h1>Dodaj drinka</h1>
      <form>
        <input type="text" />
        <select>
          {base.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <select onChange={addToList}>
          {ingr.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <ul>
          Dodaj składnik do listy
          {ingrList.map((el) => (
            <li>
              <input type="number" name="quan" />
              <span>ml - </span>
              <span>{el}</span>
              <button onClick={addIngredient}>Dodaj składnik</button>
            </li>
          ))}
        </ul>
        <ul>
          Lista składników
          {drinkIngr.map((el) => {
            return <li>ml - {el}</li>;
          })}
        </ul>
        <textarea
          type="text"
          placeholder="Krok po roku dodaj instrukcję"
          onChange={stepList}
        />
        <button onClick={addStep}>Dodaj krok</button>
        <ul>
          {instrList.map((e) => {
            return <li>{e}</li>;
          })}
        </ul>
        <button type="submit">Dodaj drinka!</button>
      </form>
    </>
  );
};

export default AddDrink;
