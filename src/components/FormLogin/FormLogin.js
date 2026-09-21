import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class FormLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  controlarEmail(event) {
    this.setState({
      email: event.target.value,
      error: ""
    });
  }

  controlarPassword(event) {
    this.setState({
      password: event.target.value,
      error: ""
    });
  }


  onSubmit(event) {

    event.preventDefault();

    const usersStorage = localStorage.getItem("users");

    if (usersStorage === null) {

      this.setState({
        error: "Credenciales incorrectas"
      });

      return;
    }

    let usersParseado = JSON.parse(usersStorage);

    let usersFiltrado = usersParseado.filter(
      usuario => usuario.email === this.state.email
    );


    if (usersFiltrado.length === 0) {

      this.setState({
        error: "Credenciales incorrectas"
      });

      return;
    }


    if (usersFiltrado[0].password !== this.state.password) {

      this.setState({
        error: "Credenciales incorrectas"
      });

      return;
    }

    cookies.set(
      "user-auth-cookie",
      usersFiltrado[0].email,
      { path: '/' }
    );

    this.props.history.push("/");

  }

  render() {

    return (
      <div className="row justify-content-center">

        <div className="col-md-6">

          <form onSubmit={(event) => this.onSubmit(event)}>

            <div className="form-group">

              <label>Email</label>

              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={(event) => this.controlarEmail(event)}
                placeholder="Ingresá tu email"
              />

            </div>


            <div className="form-group">

              <label>Contraseña</label>

              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={(event) => this.controlarPassword(event)}
                placeholder="Ingresá tu contraseña"
              />

            </div>

            <p className="text-danger">
              {this.state.error}
            </p>

            <button
              type="submit"
              className="btn btn-primary btn-block"
            >
              Ingresar
            </button>

          </form>

        </div>

      </div>
    );
  }
}

export default withRouter(FormLogin);