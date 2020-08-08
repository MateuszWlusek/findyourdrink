import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const API = "http://localhost:3005/drinks/";

const SearchDrink = () => {
  const [base, setBase] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [basealc, setBasealc] = useState([]);
  const [filtdrink, setFiltdrink] = useState([]);
  const [filtdrink2, setFiltdrink2] = useState([]);
  const [otheringr, setOtheringr] = useState([]);
  const [descr, setDescr] = useState("none");

  useEffect(() => {
    fetch(`${API}`)
      .then((res) => res.json())
      .then((data) => {
        setBase(data.bases);
        setIngr(data.allingr);
        setDrinks(data.drink);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterBase = (e) => {
    setBasealc(e.target.value);
  };
  useEffect(() => {
    const copy = [...drinks];
    basealc == "Wybierz alkohol bazowy"
      ? (setFiltdrink(copy), setFiltdrink2(copy))
      : (setFiltdrink(copy.filter((drink) => drink.base == basealc)),
        setFiltdrink2(copy.filter((drink) => drink.base == basealc)));
  }, [basealc]);

  const filterOthers = (e) => {
    setOtheringr(e.target.value);
  };

  useEffect(() => {
    const copy2 = [...filtdrink];
    otheringr == "Wybierz pozostałe składniki"
      ? setFiltdrink2(copy2)
      : setFiltdrink2(
          copy2.filter((drink) => drink.ingredients.includes(otheringr) == true)
        );
  }, [otheringr]);

  const changeClass = (e) => {
    e.target.children[0].className == "none"
      ? (e.target.children[0].className = "show")
      : (e.target.children[0].className = "none");
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
              <select onChange={filterBase}>
                <option value="Wybierz alkohol bazowy">
                  Wybierz alkohol bazowy
                </option>
                {base.map((el) => (
                  <option
                    key={Math.floor(Math.random() * (999999 - 1)) + 1}
                    value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div className="ingredients_others">
              <p>Pozostałe składniki</p>
              <select onChange={filterOthers}>
                <option value="Wybierz pozostałe składniki">
                  Wybierz pozostałe składniki
                </option>
                {ingr.map((el) => (
                  <option
                    key={Math.floor(Math.random() * (999999 - 1)) + 1}
                    value={el}>
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
            {filtdrink2?.map((e) => {
              return (
                <>
                  <li
                    className="list-found_elements"
                    key={Math.floor(Math.random() * (999999 - 1)) + 1}
                    onClick={changeClass}>
                    {e.name}
                    <div className={descr}>
                      <p>Potrzebne składniki:</p>
                      <ul>
                        {e.quantity.map((ing) => {
                          return (
                            <li
                              key={
                                Math.floor(Math.random() * (999999 - 1)) + 1
                              }>
                              {ing}
                            </li>
                          );
                        })}
                      </ul>
                      <p>Przygotowanie</p>
                      <ul>
                        {e.preparation.map((prep) => {
                          return (
                            <li
                              key={
                                Math.floor(Math.random() * (999999 - 1)) + 1
                              }>
                              {prep}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchDrink;
