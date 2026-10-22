import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import "./Buscador.css";
import { useState, useEffect } from 'react';

function Buscador(props) { 
  const [query, setQuery] = useState('');
  const [tipo, setTipo] = useState('pelicula');

  function cambiarQuery(event) {
    setQuery(event.target.value);
  }

  function cambiarTipo(event) {
    setTipo(event.target.value);
  }

  function buscar(event) {
    event.preventDefault();

    if (query === '') {
      return;
    }

    props.history.push('/buscar/' + tipo + '/' + query);
    setQuery('');
  };

  return (
    <form className="search-form" onSubmit={buscar}>
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={cambiarQuery}
      />
      <select value={tipo} onChange={cambiarTipo}>
        <option value="pelicula">Películas</option>
        <option value="serie">Series</option>
      </select>
      <button type="submit" className="btn btn-success btn-sm">Buscar</button>
    </form>
  );
}

export default withRouter(Buscador);
