import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Link,
  NavLink,
  Switch,
  Route,
} from "react-router-dom";
import SearchDrink from "./SearchDrink";
import AddDrink from "./AddDrink";
import DrinkRoulette from "./DrinkRoullette";

const Main = () => {
  return (
    <>
      <div className="home-mainscreen">
        <img src="../img/cocktail-2634115_640_cut_colored.png" />
        <nav>
          <ul>
            <li>
              <NavLink to="/add">Dodawanie drinka</NavLink>
            </li>
            <li>
              <NavLink to="/search">Wyszukiwanie drinka</NavLink>
            </li>
            <li>
              <NavLink to="/roulette">Wylosuj drinka</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
const App = () => {
  return (
    <Router>
      <>
        <header className="head-title">
          <h1>Find Your Drink</h1>
        </header>

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/add" component={AddDrink} />
          <Route path="/search" component={SearchDrink} />
          <Route path="/roulette" component={DrinkRoulette} />
        </Switch>
        <footer className="footer-copy">
          <p>&copy; Mateusz Włusek. All rights reserved</p>
        </footer>
      </>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
