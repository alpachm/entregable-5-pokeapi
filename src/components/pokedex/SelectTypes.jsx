import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectTypes = ({
  setSelectValue,
  selectValue,
  setPokemonsPerPage,
  currentPage,
  setCurrentePage,
  pokemonsPerPage,
}) => {
  const [types, setTypes] = useState();
  const pokesByPage = [4, 8, 12, 16, 20];
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type";
    axios
      .get(url)
      .then((res) => setTypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleAmountByPage = (e) => {
    setPokemonsPerPage(Number(e.target.value));
    if (currentPage > 5) {
      setCurrentePage(1);
    }
  };

  return (
    <div className="select">
      <div className="select__typePokemons">
        <p>Select the pokemon's type:</p>
        <select
          className="select__filter"
          onChange={handleChange}
          value={selectValue}
        >
          <option value="allpokemons">All pokemons</option>
          {types?.results.map((type) => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="select__numPokemons">
        <p>How many pokemons you want to see? </p>
        <select
          onChange={handleAmountByPage}
          className="select__filter"
          value={pokemonsPerPage}
        >
          <option value="10">10(Default)</option>
          {pokesByPage.map((amountByPage) => (
            <option key={amountByPage} value={amountByPage}>
              {amountByPage}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectTypes;
