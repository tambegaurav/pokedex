import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

const App = () => {
  const [pokedex, setPokedex] = useState([]);
  const [wildPokemon, setWildPokemon] = useState({});

  useEffect(() => {
    encounterWildPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(wildPokemon);

  const pokeId = () => {
    const min = Math.ceil(1);
    const max = Math.floor(151);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const encounterWildPokemon = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokeId())
      .then((response) => {
        setWildPokemon(response.data);
      });
  };

  const catchPokemon = (pokemon) => {
    setPokedex((state) => {
      const monExists = state.filter((p) => pokemon.id === p.id).length > 0;

      if (!monExists) {
        state = [...state, pokemon];
        state.sort(function (a, b) {
          return a.id - b.id;
        });
      }
      return state;
    });
    encounterWildPokemon();
  };

  const releasePokemon = (id) => {
    setPokedex((state) => state.filter((p) => p.id !== id));
  };

  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Pokedex!</h1>

        <h3 className="subtitle">
          by{" "}
          <a href="https://gauravtambe.com" target="blank">
            GT
          </a>
        </h3>
      </header>
      <section className="wild-pokemon">
        <h2>Wild Encounter</h2>
        <img
          src={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            wildPokemon.id +
            ".png"
          }
          alt=""
          className="sprite"
        />
        <h3>{wildPokemon.name}</h3>
        <button className="catch-btn" onClick={() => catchPokemon(wildPokemon)}>
          CATCH
        </button>
      </section>
      <section className="pokedex">
        <h2>Your Pokemons</h2>
        <div className="pokedex-list">
          {pokedex.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img
                src={
                  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                  pokemon.id +
                  ".png"
                }
                alt=""
                className="sprite"
              />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <button
                className="remove"
                onClick={() => releasePokemon(pokemon.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
