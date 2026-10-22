import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Card.css';

const cookies = new Cookies();

function Card(props) {
  const [abierto, setAbierto] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    let recuperoStorage;

    if (props.tipo === "pelicula") {
      recuperoStorage = localStorage.getItem("favoritosPeliculas");
    } else {
      recuperoStorage = localStorage.getItem("favoritosSeries");
    }

    let storage = JSON.parse(recuperoStorage);
    if (storage !== null) {
      let estaEnFavoritos = storage.includes(props.id);
      setEsFavorito(estaEnFavoritos);
    }
  }, []);

  function verDescripcion() {
    if (abierto === false) {
      setAbierto(true);
    } else {
      setAbierto(false);
    }
  }

  function agregarFav() {
    let clave;

    if (props.tipo === "pelicula") {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);

    if (storage !== null) {
      storage.push(props.id);
      let storageString = JSON.stringify(storage);
      localStorage.setItem(clave, storageString);
    } else {
      let storageInicial = [props.id];
      let storageString = JSON.stringify(storageInicial);
      localStorage.setItem(clave, storageString);
    }

    setEsFavorito(true);
  }

  function sacarFav() {
    let clave;

    if (props.tipo === "pelicula") {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);
    let storageFiltrado = storage.filter(id => id !== props.id);
    let storageString = JSON.stringify(storageFiltrado);
    localStorage.setItem(clave, storageString);

    setEsFavorito(false);
  }

  const tieneSesion = cookies.get('user-auth-cookie');

  let botonFavorito;

  if (tieneSesion) {

    if (esFavorito === true) {

      botonFavorito = (
        <button
          className="btn btn-outline-danger btn-sm mb-1"
          onClick={() => sacarFav()}
        >
          Sacar de favoritos
        </button>
      );

    } else {

      botonFavorito = (
        <button
          className="btn btn-outline-danger btn-sm mb-1"
          onClick={() => agregarFav()}
        >
          Agregar a favoritos
        </button>
      );

    }

  } else {

    botonFavorito = null;

  }


  return (
    <article className={props.clase}>
      <img src={props.imagen} className="card-img-top" alt={props.titulo} />
      <div className="cardBody">
        <h5 className="card-title">{props.titulo}</h5>
        {abierto ? (
          <p className="card-text">{props.descripcion}</p>
        ) : null}
        <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => verDescripcion()}>
          {abierto ? 'Ocultar descripción' : 'Ver descripción'}
        </button>
        <Link to={'/detalle/' + props.tipo + '/' + props.id} className="btn btn-primary btn-sm mb-1">
          Ir a detalle
        </Link>
        {botonFavorito}
      </div>
    </article>
  );
}

export default Card;
