import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Buscador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      tipo: 'pelicula'
    };
  }

  cambiarQuery(event) {
    this.setState({
      query: event.target.value
    });
  }

  cambiarTipo(event) {
    this.setState({
      tipo: event.target.value
    });
  }

  buscar(event) {
    event.preventDefault();

    if (this.state.query === '') {
      return;
    }

    this.props.history.push('/');
    this.setState({ query: '' });
  }

  render() {
    return (
      <form className="search-form" onSubmit={(event) => this.buscar(event)}>
        <input
          type="text"
          placeholder="Buscar..."
          value={this.state.query}
          onChange={(event) => this.cambiarQuery(event)}
        />
        <select value={this.state.tipo} onChange={(event) => this.cambiarTipo(event)}>
          <option value="pelicula">Películas</option>
          <option value="serie">Series</option>
        </select>
        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
      </form>
    );
  }
}

export default withRouter(Buscador);
