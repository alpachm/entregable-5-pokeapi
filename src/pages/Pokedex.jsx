import axios from "axios";
import "./styles/pokedex.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardPokemon from "../components/pokedex/CardPokemon";
import Header from "../components/pokedex/shared/Header";
import { useNavigate } from "react-router-dom";
import SelectTypes from "../components/pokedex/SelectTypes";
import Pagination from "../components/pokedex/Pagination";
import IsLoading from "../components/pokedex/shared/IsLoading";

const Pokedex = () => {
  const { trainerName } = useSelector((state) => state);
  const [pokemons, setPokemons] = useState();
  const [selectValue, setSelectValue] = useState("allpokemons");
  const [currentPage, setCurrentePage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectValue === "allpokemons") {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

      setIsLoading(true);
      axios
        .get(url)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
          }, 1500)
        );
    } else {
      setIsLoading(true);
      axios
        .get(selectValue)
        .then((res) => {
          const results = res.data.pokemon.map((e) => e.pokemon);
          setPokemons({ results });
        })
        .catch((err) => console.log(err))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
          }, 500)
        );
    }
  }, [selectValue]);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFistPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons?.results.slice(
    indexOfFistPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => {
    setCurrentePage(pageNumber);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.pokemon.value.trim().toLowerCase();
    navigate(`/pokedex/${inputValue}`);
    e.target.pokemon.value = "";
  };

  return (
    <div className="pokedex">
      <Header />

      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="content__pokedex">
          <h3>
            <span>Welcome {trainerName}</span>, here you can find your favorite
            pokemon
          </h3>

          <form onSubmit={handleSubmit}>
            <input
              className="input__pokedex"
              id="pokemon"
              type="text"
              placeholder="Search a pokemon..."
            />
            <button>Search</button>
          </form>
          <SelectTypes
            setSelectValue={setSelectValue}
            setPokemonsPerPage={setPokemonsPerPage}
            currentPage={currentPage}
            setCurrentePage={setCurrentePage}
            pokemonsPerPage={pokemonsPerPage}
            selectValue={selectValue}
          />
          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={pokemons?.results.length}
            paginate={paginate}
            currentPage={currentPage}
            setIsLoading={setIsLoading}
          />
          <div className="box__cards__pokemons">
            {currentPokemons?.map((pokemon) => (
              <CardPokemon key={pokemon.url} pokemonUrl={pokemon.url} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
