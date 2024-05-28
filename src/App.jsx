import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
        <nav>
            <Link to="/">Home</Link> | <Link to="/classes">Classes</Link> | <Link to="/weapons">Weapons</Link> | <Link to="/perks">Weapon Perks</Link>
        </nav>
        <Outlet />
    </>
  )
}

export default App
