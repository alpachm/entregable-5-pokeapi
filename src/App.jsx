import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokeInfo from './pages/PokeInfo'
import PortectedRoutes from './pages/PortectedRoutes'

function App() {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`App ${darkMode && 'dark__mode'}`}>

      <Routes>
        <Route path='/' element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />

        <Route element={<PortectedRoutes />} >
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokeInfo />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
