import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detalle: null,
      esFavorito: false
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    const esPelicula = this.props.match.path === '/detalle/pelicula/:id';
    const tipoEndpoint = esPelicula ? 'movie' : 'tv';
    const apiKey = '6b6cb210c82c48fac559ee907885a2e9';

    fetch('https://api.themoviedb.org/3/' + tipoEndpoint + '/' + id + '?api_key=' + apiKey)
      .then(res => res.json())
      .then(data => {
        this.setState({
          detalle: data
        });
      })
      .catch(err => console.log(err));


    let clave;

    if (esPelicula === true) {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);

    if (storage !== null) {
      let estaEnFavoritos = storage.includes(id);

      this.setState({
        esFavorito: estaEnFavoritos
      });
    }

  }

  agregarFav() {
    const id = parseInt(this.props.match.params.id);
    let esPelicula = this.props.match.path === '/detalle/pelicula/:id';

    let clave;

    if (esPelicula === true) {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);

    if (storage !== null) {

      if (storage.includes(id) === false) {
        storage.push(id);
      }
      let storageString = JSON.stringify(storage);
      localStorage.setItem(clave, storageString);
    } else {
      let storageInicial = [id];
      let storageString = JSON.stringify(storageInicial);
      localStorage.setItem(clave, storageString);
    }

    this.setState({
      esFavorito: true
    });
  }

  sacarFav() {
    const id = parseInt(this.props.match.params.id);

    let esPelicula = this.props.match.path === '/detalle/pelicula/:id';

    let clave;

    if (esPelicula === true) {
      clave = "favoritosPeliculas";
    } else {
      clave = "favoritosSeries";
    }

    let recuperoStorage = localStorage.getItem(clave);
    let storage = JSON.parse(recuperoStorage);
    let storageFiltrado = storage.filter(favId => favId !== id);
    let storageString = JSON.stringify(storageFiltrado);
    localStorage.setItem(clave, storageString);

    this.setState({
      esFavorito: false
    });
  }

  render() {
    if (this.state.detalle === null) {
      return (
        <div className="text-center my-5">
          <p>Cargando...</p>
        </div>
      );
    }

    const detalle = this.state.detalle;
    const esPelicula = this.props.match.path === '/detalle/pelicula/:id';
    const tieneSesion = cookies.get('user-auth-cookie');

    return (
      <main className="container my-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <img
              src={'https://image.tmdb.org/t/p/w342' + detalle.poster_path}
              className="img-fluid rounded shadow-sm"
              alt={esPelicula ? detalle.title : detalle.name}
            />
          </div>

          <div className="col-md-8">
            <h2>{esPelicula ? detalle.title : detalle.name}</h2>

            <p><strong>Calificación (Rating):</strong> {detalle.vote_average} / 10</p>

            <p>
              <strong>Fecha de estreno:</strong> {esPelicula ? detalle.release_date : detalle.first_air_date}
            </p>

            {esPelicula ? (
              <p><strong>Duración:</strong> {detalle.runtime} minutos</p>
            ) : null}

            <p><strong>Sinópsis:</strong> {detalle.overview}</p>

            <div>
              <strong>Géneros:</strong>
              <ul>
                {detalle.genres ? detalle.genres.map((g, idx) => (
                  <li key={idx}>{g.name}</li>
                )) : null}
              </ul>
            </div>

            {tieneSesion ? (
              this.state.esFavorito ? (
                <button className="btn btn-outline-danger mt-2" onClick={() => this.sacarFav()}>
                  Sacar de favoritos
                </button>
              ) : (


                <button className="btn btn-outline-danger mt-2" onClick={() => this.agregarFav()}>
                  Agregar a favoritos
                </button>
              )
            ) : null}
          </div>
        </div>
      </main >
    );
  }
}

export default Detalle;