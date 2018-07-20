import React from "react";
import axios from "axios";
import "./Publish.css";

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    price: ""
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
    var config = {
      headers: { Authorization: "bearer " + this.props.user.token }
    };

    var bodyParameters = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    };

    axios
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        bodyParameters,
        config
      )
      .then(response => {
        if (response.data) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <h4> Votre annonce</h4>
        <form onSubmit={this.onSubmit} className="form form-publish">
          <div className="enterInfos">
            <label htmlFor="title" className="thisTitle">
              Titre de l'annonce
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="enterInfos">
            <label htmlFor="description">Texte de l'annonce</label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="enterInfos">
            <label htmlFor="price">Prix</label>
            <input
              id="price"
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="publishButton"
              type="submit"
              value="Publier mon annonce"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Publish;
