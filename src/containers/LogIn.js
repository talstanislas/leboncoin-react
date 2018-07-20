import React from "react";
import axios from "axios";
import "./LogIn.css";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });
          this.props.history.push("/");
        }
      })
      .catch(err => {
        this.setState({
          error: "invalid email or password"
        });
      });
    event.preventDefault();
  };

  onClick = event => {
    this.props.history.push("/sign_up");
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit} className="form form-logIn">
          <h3>Connexion</h3>
          <div className="orangeBar" />

          <div className="enterMail">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="enterPassword">
            <label htmlFor="email">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <div className="error">{this.state.error}</div>

            <input className="seConnecter" type="submit" value="Se connecter" />
          </div>
          <div className="greyBar" />
          <h5>Vous n'avez pas de compte ?</h5>
          <button className="createAccount" onClick={this.onClick}>
            {" "}
            Créer un compte
          </button>
        </form>
      </div>
    );
  }
}

export default LogIn;
