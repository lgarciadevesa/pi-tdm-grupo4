import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


function NavBar() {

  const tieneSesion = cookies.get('user-auth-cookie');

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
            <li className="nav-item">

              <Link className="nav-link" to="/favoritos">Favoritas</Link>
            </li>

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


export default NavBar;
