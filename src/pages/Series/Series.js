import React, { Component } from 'react';
import Card from '../../components/Card/Card';

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      textoFiltro: '',
      pagina: 1
    };
  }

  componentDidMount() {
    this.traerSeries();
  }

  traerSeries() {
    const apiKey = '6b6cb210c82c48fac559ee907885a2e9';

    fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&page=' + this.state.pagina)
      .then(res => res.json())
      .then(data => {
        this.setState({
          series: this.state.series.concat(data.results),
          pagina: data.page + 1
        });
      })
      .catch(err => console.log(err));
  }

  evitarSubmit(event) {
    event.preventDefault();
  }

  hacerFiltro(event) {
    this.setState({
      textoFiltro: event.target.value
    });
  }

  cargarMas() {
    this.traerSeries();
  }

  render() {
    const seriesFiltradas = this.state.series.filter(item =>
      item.name.toLowerCase().includes(this.state.textoFiltro.toLowerCase())
    );

    return (
      <main>
        <h2>Todas las Series Populares</h2>

        <form className="mb-3" onSubmit={(event) => this.evitarSubmit(event)}>
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar por nombre..."
            value={this.state.textoFiltro}
            onChange={(event) => this.hacerFiltro(event)}
          />
        </form>

        <section className="row cards">
          {seriesFiltradas.map(item => (
            <Card
              key={item.id}
              id={item.id}
              tipo="serie"
              titulo={item.name}
              imagen={'https://image.tmdb.org/t/p/w342' + item.poster_path}
              descripcion={item.overview}
              clase="single-card-movie"
            />
          ))}
        </section>

        <div className="text-center my-4">
          <button className="btn btn-primary" onClick={() => this.cargarMas()}>
            Cargar más
          </button>
        </div>
      </main>
    );
  }
}

export default Series;