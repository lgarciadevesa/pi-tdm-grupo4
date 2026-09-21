import React, { Component } from 'react';
import Card from '../../components/Card/Card';

class Favoritos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      peliculas: [],
      series: [],
      hayPeliculas: true,
      haySeries: true
    };
  }


  componentDidMount() {

    let recuperoPeliculas = localStorage.getItem("favoritosPeliculas");
    let peliculasStorage = JSON.parse(recuperoPeliculas);

    let peliculasRecuperadas = [];


    if (peliculasStorage === null || peliculasStorage.length === 0) {

      this.setState({
        hayPeliculas: false
      });

    } else {

      peliculasStorage.forEach(id => {

        fetch(
          'https://api.themoviedb.org/3/movie/' +
          id +
          '?api_key=6b6cb210c82c48fac559ee907885a2e9'
        )

          .then(response => response.json())

          .then(data => {

            peliculasRecuperadas =
              peliculasRecuperadas.concat(data);

            this.setState({
              peliculas: peliculasRecuperadas
            });

          })

          .catch(error => console.log(error));

      });

    }


    let recuperoSeries = localStorage.getItem("favoritosSeries");
    let seriesStorage = JSON.parse(recuperoSeries);

    let seriesRecuperadas = [];


    if (seriesStorage === null || seriesStorage.length === 0) {

      this.setState({
        haySeries: false
      });

    } else {

      seriesStorage.forEach(id => {

        fetch(
          'https://api.themoviedb.org/3/tv/' +
          id +
          '?api_key=6b6cb210c82c48fac559ee907885a2e9'
        )

          .then(response => response.json())

          .then(data => {

            seriesRecuperadas =
              seriesRecuperadas.concat(data);

            this.setState({
              series: seriesRecuperadas
            });

          })

          .catch(error => console.log(error));

      });

    }

  }
render() {

  let contenidoPeliculas;
  let contenidoSeries;

  if (this.state.hayPeliculas === false) {

    contenidoPeliculas = (
      <p>No tenés películas favoritas.</p>
    );

  } else if (this.state.peliculas.length === 0) {

    contenidoPeliculas = (
      <p>Cargando...</p>
    );

  } else {

    contenidoPeliculas = this.state.peliculas.map((pelicula) => (

      <Card
        key={pelicula.id}
        id={pelicula.id}
        titulo={pelicula.title}
        descripcion={pelicula.overview}
        imagen={'https://image.tmdb.org/t/p/w342' + pelicula.poster_path}
        tipo="pelicula"
        clase="single-card-movie"
      />

    ));

  }


  if (this.state.haySeries === false) {

    contenidoSeries = (
      <p>No tenés series favoritas.</p>
    );

  } else if (this.state.series.length === 0) {

    contenidoSeries = (
      <p>Cargando...</p>
    );

  } else {

    contenidoSeries = this.state.series.map((serie) => (

      <Card
        key={serie.id}
        id={serie.id}
        titulo={serie.name}
        descripcion={serie.overview}
        imagen={'https://image.tmdb.org/t/p/w342' + serie.poster_path}
        tipo="serie"
        clase="single-card-movie"
      />

    ));

  }
    return (
    <main className="container my-4">

      <h2 className="alert alert-primary">
        Películas favoritas
      </h2>

      <section className="card-container">
        {contenidoPeliculas}
      </section>


      <h2 className="alert alert-warning">
        Series favoritas
      </h2>

      <section className="card-container">
        {contenidoSeries}
      </section>

    </main>
  );

}
}

export default Favoritos;