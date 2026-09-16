import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormRegister extends Component {

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


    let usuarioACrear = {
      email: this.state.email,
      password: this.state.password,
      createdAt: Date.now()
    };

    
    if (this.state.email.includes("@") === false) {

    this.setState({
        error: "email mal formateado"
    });

    return;
    }


    if (this.state.password.length < 6) {

      this.setState({
        error: "La contraseña debe tener al menos 6 caracteres"
      });

      return;
    }


    let usersStorage = localStorage.getItem("users");


    if (usersStorage !== null) {

      let usersParseado = JSON.parse(usersStorage);

      let usersFiltrado = usersParseado.filter(
        usuario => usuario.email === this.state.email
      );


      if (usersFiltrado.length > 0) {

        this.setState({
          error: "El email ya está en uso"
        });

        return;

      } else {

        usersParseado.push(usuarioACrear);

        let usersEnJson = JSON.stringify(usersParseado);

        localStorage.setItem("users", usersEnJson);

      }


    } else {

      let usersInicial = [usuarioACrear];

      let usersEnJson = JSON.stringify(usersInicial);

      localStorage.setItem("users", usersEnJson);

    }


    this.props.history.push("/login");

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
              Registrarse
            </button>

          </form>


          <p className="mt-3 text-center">
            ¿Ya tenés cuenta?{" "}
            <a href="/login">
              Iniciar sesión
            </a>
          </p>

        </div>

      </div>
    );
  }
}

export default withRouter(FormRegister);