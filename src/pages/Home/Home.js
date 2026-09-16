import React, { Component } from 'react';
import Buscador from '../../components/Buscador/Buscador';
import Seccion from '../../components/Seccion/Seccion';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: []
    };
  }

  componentDidMount() {
    const apiKey = '6b6cb210c82c48fac559ee907885a2e9';

    // Películas populares
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey)
      .then(res => res.json())
      .then(data => {
        this.setState({
          peliculas: data.results.slice(0, 4)
        });
      })
      .catch(err => console.log(err));

    // Series populares
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey)
      .then(res => res.json())
      .then(data => {
        this.setState({
          series: data.results.slice(0, 4)
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <main>
        <Buscador />

        <Seccion
          titulo="Películas populares"
          color="alert-primary"
          tipo="pelicula"
          clase="single-card-movie"
          items={this.state.peliculas}
          rutaVerTodas="/peliculas"
        />

        <Seccion
          titulo="Series populares"
          color="alert-warning"
          tipo="serie"
          clase="single-card-movie"
          items={this.state.series}
          rutaVerTodas="/series"
        />
      </main>
    );
  }
}


export default Home;
