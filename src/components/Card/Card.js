import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false,
      esFavorito: false
    };
  }

  componentDidMount() {
    let recuperoStorage;

    if (this.props.tipo === "pelicula") {
      recuperoStorage = localStorage.getItem("favoritosPeliculas");
    } else {
      recuperoStorage = localStorage.getItem("favoritosSeries");
    }

    let storage = JSON.parse(recuperoStorage);
    if (storage !== null) {
      let estaEnFavoritos = storage.includes(this.props.id);
      this.setState({
        esFavorito: estaEnFavoritos
      });
    }
  }

  verDescripcion() {
    if (this.state.abierto === false) {
      this.setState({
        abierto: true
      });
    } else {
      this.setState({
        abierto: false
      });
    }
  }

  agregarFav() {
    let clave;

    if (this.props.tipo === "pelicula") {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);

    if (storage !== null) {
      storage.push(this.props.id);
      let storageString = JSON.stringify(storage);
      localStorage.setItem(clave, storageString);
    } else {
      let storageInicial = [this.props.id];
      let storageString = JSON.stringify(storageInicial);
      localStorage.setItem(clave, storageString);
    }

    this.setState({
      esFavorito: true
    });
  }

  sacarFav() {
    let clave;

    if (this.props.tipo === "pelicula") {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);
    let storageFiltrado = storage.filter(id => id !== this.props.id);
    let storageString = JSON.stringify(storageFiltrado);
    localStorage.setItem(clave, storageString);

    this.setState({
      esFavorito: false
    });
  }


  render() {
    const tieneSesion = cookies.get('user-auth-cookie');

    let botonFavorito;

    if (tieneSesion) {

      if (this.state.esFavorito === true) {

        botonFavorito = (
          <button
            className="btn btn-outline-danger btn-sm mb-1"
            onClick={() => this.sacarFav()}
          >
            Sacar de favoritos
          </button>
        );

      } else {

        botonFavorito = (
          <button
            className="btn btn-outline-danger btn-sm mb-1"
            onClick={() => this.agregarFav()}
          >
            Agregar a favoritos
          </button>
        );

      }

    } else {

      botonFavorito = null;

    }


    return (
      <article className={this.props.clase}>
        <img src={this.props.imagen} className="card-img-top" alt={this.props.titulo} />
        <div className="cardBody">
          <h5 className="card-title">{this.props.titulo}</h5>
          {this.state.abierto ? (
            <p className="card-text">{this.props.descripcion}</p>
          ) : null}
          <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => this.verDescripcion()}>
            {this.state.abierto ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link to={'/detalle/' + this.props.tipo + '/' + this.props.id} className="btn btn-primary btn-sm mb-1">
            Ir a detalle
          </Link>
          {botonFavorito}
        </div>
      </article>
    );
  }
}

export default Card;
