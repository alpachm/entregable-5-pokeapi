import axios from "axios";
import "./styles/pokeInfo.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import colors from "../utils/colorsPokemon";
import Header from "../components/pokedex/shared/Header";
import "./styles/pokeInfoError.css";
import IsLoading from "../components/pokedex/shared/IsLoading";

const PokeInfo = () => {
  const { id } = useParams();
  const [pokemonSelect, setPokemonSelect] = useState();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    setIsLoading(true)
    axios
      .get(url)
      .then((res) => {
        setPokemonSelect(res.data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
      })
      .finally(setTimeout(() => {
        setIsLoading(false)
      }, 1500))
  }, [id]);

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/pokedex/");
  };

  const typeColor = pokemonSelect?.types[0].type.name;

  if (isLoading) {
    return <IsLoading />
  } else if (hasError) {
    return (
      <div className="error__poke-info">
        {/* <img className='img__error' src="./images/pikachu-triste_auuu.1280.webp" alt="photo" /> */}
        <h1>
          <span className="x__error">X</span>the pokemon{" "}
          <span className="poke__name-error">{id}</span> does not exist
          <span className="x__error">X</span>
        </h1>
        <button className="btn__error" onClick={onClick}>
          return
        </button>
      </div>
    );
  } else {
    return (
      <div className="card__info">
        <Header />

        <div className="card__btn--return">
          <button onClick={onClick}>
            <i className="bx bx-arrow-back"></i>
            <span>Return to Pokedex</span>
          </button>
        </div>


        <div
          // style={{
          //   background: `linear-gradient(0deg, white 0 88%, ${colors[typeColor]?.first} 88% 91%, ${colors[typeColor]?.second} 93% 96%, ${colors[typeColor]?.third} 98% 100%`,
          // }}
          className="content__poke__info"
        >
          <div className="top__card__info">
            <div className="content__img-info"
              style={{
                background: `linear-gradient(0deg, var(--light-white) 0 20%, ${colors[typeColor]?.first} 22% 40%, ${colors[typeColor]?.second} 43% 65%, ${colors[typeColor]?.third} 68% 100%`,
              }}>
              <img className="img__info"
                src={
                  pokemonSelect?.sprites.other["official-artwork"].front_default
                }
                alt=""
              />
            </div>
            <span style={{ color: colors[typeColor]?.third }}>#{id}</span>
            <h1 style={{ color: colors[typeColor]?.third }}>
              {pokemonSelect?.name}
            </h1>
          </div>

          <hr />

          <div className="middle__card__info">
            <div className="characteristics">
              <div className="box__char">
                <span>Weight</span>
                <p>{pokemonSelect?.weight}</p>
              </div>
              <div className="box__char">
                <span>Height</span>
                <p>{pokemonSelect?.height}</p>
              </div>
            </div>

            <div className="type__ability">
              <div className="box__t-a">
                <h2>Type</h2>
                <div className="types-abilitys">
                  {pokemonSelect?.types.map((type) => (
                    <span
                      style={{
                        background: colors[typeColor].first,
                        color: "white",
                        border: "none",
                      }}
                      key={type.type.url}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="box__t-a">
                <h2>Ability</h2>
                <div className="types-abilitys">
                  {pokemonSelect?.abilities.map((ab) => (
                    <span key={ab.ability.url}>{ab.ability.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="bottom__card__info">
            <h1>Stats</h1>

            {pokemonSelect?.stats.map((stat) => (
              <div className="stat__bar" key={stat.stat.name}>
                <div className="text__bar__stat">
                  <span>{stat.stat.name}</span>
                  <p>{stat.base_stat}/150</p>
                </div>
                <div
                  style={{
                    background: `linear-gradient(90deg, #E6901E 0, #FCD676 ${stat.base_stat}%, rgb(231, 231, 231) ${stat.base_stat}% 100%)`,
                  }}
                  className="bar"
                ></div>
              </div>
            ))}
          </div>
          <h2 className="tittle__move">Special moves</h2>
          <div className="card__moves">

            {
              pokemonSelect?.moves.map(move => (
                <h2 className="name__move">{move.move.name}</h2>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
};

export default PokeInfo;
