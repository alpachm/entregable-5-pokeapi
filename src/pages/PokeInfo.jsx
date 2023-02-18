import axios from 'axios'
import './styles/pokeInfo.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import colors from '../utils/colorsPokemon'
import Header from '../components/pokedex/shared/Header'

const PokeInfo = () => {

  const { id } = useParams()

  const [pokemonSelect, setPokemonSelect] = useState()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    axios.get(url)
      .then(res => setPokemonSelect(res.data))
      .catch(err => console.log(err))

  }, [])

  const typeColor = pokemonSelect?.types[0].type.name

  return (
    <div className='card__info'>

      <Header />

      <div
        style={{ background: `linear-gradient(0deg, white 0 80%, ${colors[typeColor]?.first} 80% 84%, ${colors[typeColor]?.second} 88% 92%, ${colors[typeColor]?.third} 96% 100%` }}
        className="content__poke__info">

        <div className="top__card__info">
          <img src={pokemonSelect?.sprites.other['official-artwork'].front_default} alt="" />
          <span style={{ color: colors[typeColor]?.third }}>#{id}</span>
          <h1 style={{ color: colors[typeColor]?.third }} >{pokemonSelect?.name}</h1>

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
                {
                  pokemonSelect?.types.map(type => (
                    <span style={{
                      background: colors[typeColor].first,
                      color: 'var(--white)',
                      border: 'none'
                    }} key={type.type.url} >{type.type.name}</span>
                  ))
                }
              </div>
            </div>

            <div className="box__t-a">
              <h2>Ability</h2>
              <div className="types-abilitys">
                {
                  pokemonSelect?.abilities.map(ab => (
                    <span key={ab.ability.url} >{ab.ability.name}</span>
                  ))
                }
              </div>
            </div>

          </div>

        </div>

        <hr />

        <div className="bottom__card__info">
          <h1>Stats</h1>

          {
            pokemonSelect?.stats.map(stat => (
              <div className="stat__bar">
                <div className="text__bar__stat">
                  <span>{stat.stat.name}</span>
                  <p>{stat.base_stat}/150</p>
                </div>
                <div
                  style={{ background: `linear-gradient(90deg, #E6901E 0, #FCD676 ${stat.base_stat}%, rgb(231, 231, 231) ${stat.base_stat}% 100%)` }}
                  className="bar"></div>
              </div>
            ))
          }

        </div>

      </div>
    </div>
  )
}

export default PokeInfo