import axios from 'axios'
import './styles/pokedex.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardPokemon from '../components/pokedex/CardPokemon'
import Header from '../components/pokedex/shared/Header'

const Pokedex = () => {

  const { trainerName } = useSelector(state => state)

  const [pokemons, setPokemons] = useState()

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=200&offset=0`

    axios.get(url)
      .then(res => setPokemons(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleSubmit = () => {

  }

  return (
    <div className='pokedex'>

      <Header />

      <div className="content__pokedex">
        <h3><span>Welcome {trainerName}</span>, here you can find your favorite pokemon</h3>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Search a pokemon...' />
          <button>Search</button>
        </form>

        <div className="box__cards__pokemons">
          {
            pokemons?.results.map(pokemon => (
              <CardPokemon
                key={pokemon.url}
                pokemonUrl={pokemon.url}
              />
            ))
          }
        </div>
      </div>pokedex



    </div>
  )
}

export default Pokedex