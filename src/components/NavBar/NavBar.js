import React from 'react';
import { Link, withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';
import './NavBar.css';

const cookies = new Cookies();


function NavBar(props) {

  const tieneSesion = cookies.get('user-auth-cookie');

  function cerrarSesion() {
    cookies.remove('user-auth-cookie', { path: '/' });
    props.history.push('/login');
  }

  return (
    <header>
      <h1>UdeSA Movies</h1>
      <nav>
        <ul className="nav nav-tabs my-4">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/peliculas">Películas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/series">Series</Link>
          </li>

          {tieneSesion ? (
            <React.Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/favoritos">Favoritas</Link>
              </li>
              <li className="nav-item ml-auto">
                <button
                  className="btn btn-outline-danger btn-sm mt-2"
                  onClick={() => cerrarSesion()}
                >
                  Cerrar sesión
                </button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item ml-auto">
                <Link className="nav-link" to="/register">Crear Cuenta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
}


export default withRouter(NavBar);
