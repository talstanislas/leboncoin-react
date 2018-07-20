import React from "react";
import { Link } from "react-router-dom";
import Offer from "./Offer";
import axios from "axios";
import "./Home.css";
import Filters from "./Filters";

class Home extends React.Component {
  state = {
    offers: [],
    isLoading: true
  };

  componentDidMount() {
    this.getAds();
  }

  getAds = params => {
    if (params) {
      params = "?" + params;
    } else {
      params = "";
    }
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer" + params)
      .then(response => {
        console.log(this.state.offers.length);
        this.setState({
          offers: response.data,
          isLoading: false
        });
      });
  };

  render() {
    const offer = [];
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      for (let i = 0; i < this.state.offers.length; i++) {
        offer.push(
          <Offer
            key={[i]}
            _id={this.state.offers[i]._id}
            picture={this.state.offers[i].picture}
            title={this.state.offers[i].title}
            description={this.state.offers[i].description}
            price={this.state.offers[i].price}
            history={this.props.history}
          />
        );
        /*  */
      }
    }

    return (
      <div>
        <div className="searchBar">
          <Filters
            search={this.getAds}
            nbrAnnonces={this.state.offers.length}
          />
        </div>
        <section className="container homeContainer">
          <div className="offers">{offer}</div>
        </section>
      </div>
    );
  }
}

export default Home;
