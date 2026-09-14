import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abierto: false
    };
  }

  verDescripcion() {
    this.setState({
      abierto: !this.state.abierto
    });
  }

  render() {
    return (
      <article className={this.props.clase}>
        <img src={this.props.imagen} className="card-img-top" alt={this.props.titulo} />
        <div className="cardBody">
          <p className="card-title">{this.props.titulo}</p>
          {this.state.abierto ? (
            <p className="card-text">{this.props.descripcion}</p>
          ) : null}
          <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => this.verDescripcion()}>
            {this.state.abierto ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link to="/" className="btn btn-primary btn-sm mb-1">
            Ir a detalle
          </Link>
        </div>
      </article>
    );
  }
}

export default Card;
