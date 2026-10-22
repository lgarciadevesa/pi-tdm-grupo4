import { useState } from 'react';
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function controlarEmail(event) {
    setEmail(event.target.value);
    setError("");
  }

  function controlarPassword(event) {
    setPassword(event.target.value);
    setError(""); }

  function onSubmit(event) {

    event.preventDefault();

    const usersStorage = localStorage.getItem("users");

    if (usersStorage === null) {

      setError("Credenciales incorrectas");

      return;
    }

    let usersParseado = JSON.parse(usersStorage);

    let usersFiltrado = usersParseado.filter(
      usuario => usuario.email === email
    );

    if (usersFiltrado.length === 0) {

      setError("Credenciales incorrectas");

      return;
    }

    if (usersFiltrado[0].password !== password) {

      setError("Credenciales incorrectas");

      return;
    }

    cookies.set(
      "user-auth-cookie",
      usersFiltrado[0].email,
      { path: '/' }
    );

    props.history.push("/"); }

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
            Ingresar
          </button>

        </form>

      </div>

    </div>
  );
}

export default withRouter(FormLogin);
