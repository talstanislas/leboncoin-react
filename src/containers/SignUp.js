import React from "react";
import axios from "axios";
import "./signUp.css";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
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
      .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username
      })
      .then(response => {
        console.log(response.data);
        // {
        //   account: { username: "Farid" },
        //   token: "Ii0HYfXTN7L2SMoL",
        //   _id: "5b4ceb668c2a9a001440b2fb"
        // };

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
          error: "Your email or username is already taken, please try again"
        });
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="container signUpContainer">
        <div className="pourquoiCompte">
          <h3>Pourquoi créer un compte ? </h3>
          <div className="avantages">
            <i class="far fa-clock" />

            <div className="infos">
              <div className="title"> Gagnez du temps</div> Publiez vos annonces
              rapidement, avec vos informations pré-remplies chaque fois que
              vous souhaitez déposer une nouvelle annonce.
            </div>
          </div>

          <div className="avantages">
            <i class="fas fa-bell" />
            <div className="infos">
              <div className="title"> Soyez les premiers informés</div> Créez
              des alertes Immo ou Emploi et ne manquez jamais l'annonce qui vous
              interesse.
            </div>
          </div>

          <div className="avantages">
            <i class="far fa-eye" />
            <div className="infos">
              <div className="title"> Visibilité</div> Suivez les statistiques
              de vos annonces (nombre de fois où votre annonce à été vue, nombre
              de contacts reçus).
            </div>
          </div>
        </div>

        <form onSubmit={this.onSubmit} className="form form-signup">
          <h3>Créer un compte</h3>
          <div className="orangeBar" />
          <div className="enterInfos">
            <label htmlFor="username">Pseudo</label>
            <input
              id="username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="enterInfos">
            <label htmlFor="email">Adresse Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="enterInfos">
            <label htmlFor="email">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="error">{this.state.error}</div>

          <input
            className="createButton"
            type="submit"
            value="Créer mon compte"
          />
        </form>
      </div>
    );
  }
}

export default SignUp;
