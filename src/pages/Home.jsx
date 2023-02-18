import React from 'react'
import './styles/home.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerName } from '../store/slices/trainerName.slice'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        dispatch(setTrainerName(e.target.trainerName.value.trim()))

        navigate('/pokedex')

        e.target.reset()
    }

    return (
        <div className='home'>
            <div className="content__home">
                <img src="./images/pokedex.png" alt="" />
                <h1>¡Hi trainer!</h1>
                <p>Give me your name to start</p>

                <form onSubmit={handleSubmit}>
                    <input id='trainerName' type="text" placeholder='Your name...' />
                    <button>Start</button>
                </form>
            </div>

            <footer>
                <div className='circleFooter'>
                    <div className="childCircle"></div>
                </div>
            </footer>
        </div>
    )
}

export default Home