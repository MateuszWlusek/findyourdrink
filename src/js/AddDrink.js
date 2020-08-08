import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const API = "http://localhost:3005/drinks/";

const AddDrink = () => {
  const [baseAlc, setBase] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingrList, setIngrList] = useState([]);
  const [drinkIngr, setDrinkIngr] = useState([]);
  const [instr, setInstr] = useState("");
  const [instrList, setInstrList] = useState([]);
  const [addDrink, setAddDrink] = useState({
    bases: [],
    allingr: [],
    id: "",
    baseAlc: "",
    name: "",
    ingredients: [],
    quantity: [],
    preparation: [],
  });
  useEffect(() => {
    fetch(`${API}`)
      .then((res) => res.json())
      .then((data) => {
        setBase(data.bases);
        setIngr(data.allingr);
        setDrinks(data.drink);
      });
  }, []);
  const addToList = (e) => {
    if (
      e.target.value == "Wybierz alkohol bazowy" ||
      e.target.value == "Wybierz pozostałe składniki"
    ) {
      null;
    } else {
      setIngrList([e.target.value]);
    }
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
    e.target.parentElement.children[1].value = "";
  };

  const addIngrToBase = () => {
    fetch(`${API}`, {
      method: "PATCH",
      body: JSON.stringify({
        allingr: [...ingr, addDrink.allingr],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIngr((prev) => [...prev, data]);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addToBase = (e) => {
    const { name, value } = e.target;
    setAddDrink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const drinkName = (e) => {
    const { name, value } = e.target;
    setAddDrink((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddDrink = () => {
    fetch(`${API}`, {
      method: "PATCH",
      body: JSON.stringify({
        drink: [
          ...drinks,
          {
            id: drinks.length + 1,
            baseAlc: addDrink.baseAlc,
            name: addDrink.name,
            ingredients: drinkIngr,
            quantity: drinkIngr,
            preparation: instrList,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIngr((prev) => [...prev, data]);
      })
      .catch((error) => {
        alert(error);
      });
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
        <form onSubmit={handleAddDrink}>
          <label from="name">Podaj nazwę drinka</label>
          <input
            id="name"
            type="text"
            name="name"
            value={addDrink.name}
            onChange={drinkName}
          />
          <label from="baseAlc">Wybierz alkohol bazowy</label>
          <select onChange={addToList}>
            <option value="Wybierz alkohol bazowy">
              Wybierz alkohol bazowy
            </option>
            {baseAlc.map((el) => (
              <option
                key={Math.floor(Math.random() * (999999 - 1)) + 1}
                id="baseAlc"
                name="baseAlc"
                value={el}>
                {el}
              </option>
            ))}
          </select>
          <label from="ingred">Wybierz dodatkowe składniki</label>
          <select onChange={addToList}>
            <option value="Wybierz pozostałe składniki">
              Wybierz pozostałe składniki
            </option>
            {ingr.map((el) => (
              <option
                key={Math.floor(Math.random() * (999999 - 1)) + 1}
                id="ingred"
                name="ingred"
                value={el}>
                {el}
              </option>
            ))}
          </select>
          <label from="ingredient">
            Dodaj swój składnik, jeśli nie ma go na liście
          </label>
          <input
            id="allingr"
            name="allingr"
            type="text"
            value={addDrink.allingr}
            onChange={addToBase}
          />
          <button className="btn-addbase" onClick={addIngrToBase}>
            Dorzuć swój składnik do bazy
          </button>
          <label>Dodaj składnik do listy</label>
          <ul>
            {ingrList.map((el) => (
              <li key={Math.floor(Math.random() * (999999 - 1)) + 1}>
                <label from="quan">Podaj ilość </label>
                <input id="quan" type="number" />
                <span>ml - </span>
                <span>{el}</span>
                <button className="btn-addingr" onClick={addIngredient}>
                  Dodaj składnik
                </button>
              </li>
            ))}
          </ul>
          <label from="ingredients">Lista składników</label>
          <ul>
            {drinkIngr.map((el) => {
              return (
                <li
                  key={Math.floor(Math.random() * (999999 - 1)) + 1}
                  id="quantity"
                  name="quantity"
                  value={addDrink.quantity}>
                  {quan.value}ml - {el}
                </li>
              );
            })}
          </ul>
          <div className="text-form">
            <label from="preparation"></label>
            <textarea
              id="preparation"
              name="preparation"
              type="text"
              placeholder="Krok po kroku dodaj instrukcję"
              cols="40"
              rows="2"
              onChange={stepList}
            />
            <button className="btn-addstep" onClick={addStep}>
              Dodaj krok
            </button>
            <ul>
              {instrList.map((e) => {
                return (
                  <li
                    key={Math.floor(Math.random() * (999999 - 1)) + 1}
                    value={addDrink.preparation}>
                    {e}
                  </li>
                );
              })}
            </ul>
          </div>

          <button className="btn-adddrink" type="submit">
            Dodaj drinka!
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDrink;
