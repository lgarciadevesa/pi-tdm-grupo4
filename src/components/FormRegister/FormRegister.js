import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function FormRegister(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function controlarEmail(event) {
    setEmail(event.target.value);
    setError("");
  }

  function controlarPassword(event) {
    setPassword(event.target.value);
    setError("");
  }

  function onSubmit(event) {

    event.preventDefault();

    let usuarioACrear = {
      email: email,
      password: password,
      createdAt: Date.now()
    };


    if (email.includes("@") === false) {

      setError("email mal formateado");

      return;
    }


    if (password.length < 6) {

      setError("La contraseña debe tener al menos 6 caracteres");

      return;
    }


    let usersStorage = localStorage.getItem("users");


    if (usersStorage !== null) {

      let usersParseado = JSON.parse(usersStorage);

      let usersFiltrado = usersParseado.filter(
        usuario => usuario.email === email
      );


      if (usersFiltrado.length > 0) {

        setError("El email ya está en uso");

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

    props.history.push("/login");

  }

  return (

    <div className="row justify-content-center">

      <div className="col-md-6">

        <form onSubmit={(event) => onSubmit(event)}>

          <div className="form-group">

            <label>Email</label>

            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(event) => controlarEmail(event)}
              placeholder="Ingresá tu email"
            />

          </div>


          <div className="form-group">

            <label>Contraseña</label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => controlarPassword(event)}
              placeholder="Ingresá tu contraseña"
            />

          </div>


          <p className="text-danger">
            {error}
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

export default withRouter(FormRegister);