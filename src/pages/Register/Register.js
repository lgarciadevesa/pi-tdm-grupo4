import React, { Component } from "react";
import FormRegister from "../../components/FormRegister/FormRegister";

class Register extends Component {

  render() {
    return (
      <main>

        <h2 className="alert alert-primary">
          Registro
        </h2>

        <FormRegister />

      </main>
    );
  }
}

export default Register;