import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectTypes = ({
  setSelectValue,
  setPokemonsPerPage,
  currentPage,
  setCurrentePage,
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
      <select className="select__filter" onChange={handleChange}>
        <option value="allpokemons">All pokemons</option>
        {types?.results.map((type) => (
          <option key={type.url} value={type.url}>
            {type.name}
          </option>
        ))}
      </select>

      <select onChange={handleAmountByPage} className="select__filter">
        <option value="10">How many pokemons you want to see?</option>
        {pokesByPage.map((amountByPage) => (
          <option key={amountByPage} value={amountByPage}>
            {amountByPage}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTypes;
