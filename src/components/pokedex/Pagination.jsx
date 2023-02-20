import React from "react";
import "./pagination.css";

const Pagination = ({
  pokemonsPerPage,
  totalPokemons,
  paginate,
  currentPage,
  setIsLoading
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    paginate(number)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={number == currentPage ? "active" : ""}
          >
            {number}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
