import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import Buscador from '../../components/Buscador/Buscador';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      cargando: true
    };
  }

  componentDidMount() {
    this.buscar();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.query !== this.props.match.params.query ||
      prevProps.match.params.tipo !== this.props.match.params.tipo
    ) {
      this.buscar();
    }
  }

  buscar() {
    const query = this.props.match.params.query;
    const tipo = this.props.match.params.tipo;
    const tipoEndpoint = tipo === 'pelicula' ? 'movie' : 'tv';
    const apiKey = '6b6cb210c82c48fac559ee907885a2e9';

    this.setState({ cargando: true });

    fetch('https://api.themoviedb.org/3/search/' + tipoEndpoint + '?api_key=' + apiKey + '&query=' + query)
      .then(res => res.json())
      .then(data => {
        this.setState({
          resultados: data.results ? data.results : [],
          cargando: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          resultados: [],
          cargando: false
        });
      });
  }

  render() {
    const query = this.props.match.params.query;
    const tipo = this.props.match.params.tipo;
    const esPelicula = tipo === 'pelicula';

    if (this.state.cargando) {
      return (
        <main>
          <p className="alert alert-secondary">Buscando "{query}"...</p>
        </main>
      );
    }

    if (this.state.resultados.length === 0) {
      return (
        <main>
          <p className="alert alert-danger">No se encontraron resultados para "{query}"</p>
        </main>
      );
    }

    return (
      <main>
        <Buscador/>
        <h2 className={'alert ' + (esPelicula ? 'alert-primary' : 'alert-warning')}>
          Resultados para "{query}" ({this.state.resultados.length})
        </h2>

        <section className="row cards">
          {this.state.resultados.map(item => (
            <Card
              key={item.id}
              id={item.id}
              tipo={tipo}
              titulo={esPelicula ? item.title : item.name}
              imagen={'https://image.tmdb.org/t/p/w342' + item.poster_path}
              descripcion={item.overview}
              clase={esPelicula ? 'single-card-movie' : 'single-card-tv'}
            />
          ))}
        </section>
      </main>
    );
  }
}

export default SearchResult;
