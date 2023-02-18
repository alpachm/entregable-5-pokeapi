import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokeInfo from './pages/PokeInfo'
import PortectedRoutes from './pages/PortectedRoutes'

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<PortectedRoutes />} >
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/pokedex/:id' element={<PokeInfo />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
