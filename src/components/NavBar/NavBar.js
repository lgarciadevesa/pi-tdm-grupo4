import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <header>
      <h1>UdeSA Movies</h1>
      <nav>
        <ul className="nav nav-tabs my-4">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Películas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Series</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Favoritas</Link>
          </li>
          <li className="nav-item ml-auto">
            <Link className="nav-link" to="/">Registro</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
