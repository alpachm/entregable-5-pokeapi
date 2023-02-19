import React from "react";

const Pagination = ({
  pokemonsPerPage,
  totalPokemons,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            onClick={() => paginate(number)}
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
