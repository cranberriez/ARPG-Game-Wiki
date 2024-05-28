import { Outlet, Link } from 'react-router-dom';
import { generatePath } from '@/helpers/generatePath';
import './App.css'

function App() {

  return (
    <>
        <nav>
            <Link to={generatePath("/")}>Home</Link> | <Link to={generatePath("/classes")}>Classes</Link> | <Link to={generatePath("/weapons")}>Weapons</Link> | <Link to={generatePath("/perks")}>Weapon Perks</Link>
        </nav>
        <Outlet />
    </>
  )
}

export default App
