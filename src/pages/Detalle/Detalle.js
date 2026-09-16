import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detalle: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
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
  }

  render() {
    if (this.state.detalle === null) {
      return (
        <div className="text-center my-5">
          <p>Cargando...</p>
        </div>
      );
    }

    const { detalle } = this.state;
    const esPelicula = this.props.match.path === '/detalle/pelicula/:id';
    const tieneSesion = cookies.get('user-auth-cookie');

    return (
      <main className="container my-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <img
              src={'https://image.tmdb.org/t/p/w342' + detalle.poster_path}
              className="img-fluid rounded shadow-sm"
              alt={detalle.title || detalle.name}
            />
          </div>

          <div className="col-md-8">
            <h2>{detalle.title || detalle.name}</h2>

            <p><strong>Calificación (Rating):</strong> {detalle.vote_average} / 10</p>

            <p>
              <strong>Fecha de estreno:</strong> {detalle.release_date || detalle.first_air_date}
            </p>

            {esPelicula ? (
              <p><strong>Duración:</strong> {detalle.runtime} minutos</p>
            ) : null}

            <p><strong>Sinópsis:</strong> {detalle.overview}</p>

            <div>
              <strong>Géneros:</strong>
              <ul>
                {detalle.genres ? detalle.genres.map((g, idx) => (
                  <li key={g.id || idx}>{g.name}</li>
                )) : null}
              </ul>
            </div>

            {tieneSesion ? (
              <button className="btn btn-outline-danger mt-2">
                Agregar a favoritos
              </button>
            ) : null}
          </div>
        </div>
      </main>
    );
  }
}

export default Detalle;