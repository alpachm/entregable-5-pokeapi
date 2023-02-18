import axios from "axios"
import './cardPokemon.css'
import { useEffect, useState } from "react"
import colors from "../../utils/colorsPokemon"
import { useNavigate } from "react-router-dom"

const CardPokemon = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(pokemonUrl)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [])

    const typePoke = []

    pokemon?.types.map(type => typePoke.push(type.type.name))

    const typeColor = pokemon?.types[0].type.name

    const handleClick = () => {
        navigate(`/pokedex/${pokemon?.id}`)
    }

    return (
        <div
            onClick={handleClick}
            style={{
                background: `linear-gradient(0deg, white 0 65%, ${colors[typeColor]?.first} 65% 70%, ${colors[typeColor]?.second} 80% 85%, ${colors[typeColor]?.third} 95% 100%`,
                borderColor: colors[typeColor]?.second
            }}
            className="card__pokemon">
            <div className="top__card">
                <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                <h1 style={{ color: colors[typeColor]?.third }} >{pokemon?.name}</h1>
                <h2>{typePoke.join(' / ')}</h2>
                <span>Type</span>
            </div>
            <hr />
            <div className="bottom__card">
                {
                    pokemon?.stats.map(stat => (
                        <div key={stat.stat.url} className="stats">
                            <span>{stat.stat.name}</span>
                            <p style={{ color: colors[typeColor]?.third }} >{stat.base_stat}</p>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default CardPokemon