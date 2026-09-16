import React, { Component } from "react";
import FormLogin from "../../components/FormLogin/FormLogin.js";

class Login extends Component {

  render() {
    return (
      <main>

        <h2 className="alert alert-primary">
          Login
        </h2>

        <FormLogin />

      </main>
    );
  }
}

export default Login;