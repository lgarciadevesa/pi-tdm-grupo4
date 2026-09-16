import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
    const tieneSesion = cookies.get('user-auth-cookie');


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
          <Link to={'/detalle/' + this.props.tipo + '/' + this.props.id} className="btn btn-primary btn-sm mb-1">
            Ir a detalle
          </Link>
          {tieneSesion ? (
            <button className="btn btn-outline-danger btn-sm mb-1">
              Agregar a favoritos
            </button>
          ) : null}
        </div>
      </article>
    );
  }
}

export default Card;
