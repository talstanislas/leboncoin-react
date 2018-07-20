import React from "react";
import axios from "axios";
import "./CompleteOffer.css";

class CompleteOffer extends React.Component {
  state = {
    offer: {},
    isLoading: true
  };

  componentDidMount() {
    this.getOffer();
  }

  getOffer = () => {
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          offer: response.data,
          isLoading: false
        });
      });
  };

  render() {
    let picture = null;
    if (this.state.offer.picture) {
      picture = <img src={this.state.offer.picture} />;
    } else {
      picture = <img src="/img/lbc.png" />;
    }

    let price = null;
    if (this.state.offer.price) {
      price = this.state.offer.price;
    } else {
      price = 100;
    }

    let description = null;
    if (this.state.offer.description) {
      description = this.state.offer.description;
    } else {
      description =
        "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.";
    }
    return (
      <section className="container offerContainer">
        <section className="offre">
          <div className="thisPicture"> {picture} </div>
          <div className="titlePrice">
            <div className="thisTitle"> {this.state.offer.title} </div>
            <div className="thisPrice">
              {" "}
              {price} {" €"}
            </div>
          </div>
          <div className="thisDescription">
            {" "}
            Description : <br /> <br /> {description}
          </div>
        </section>
        <section className="seller">
          <div className="picAndName">
            <i class="fas fa-user-circle" />
            <div className="userName">
              {" "}
              {this.state.offer.creator
                ? this.state.offer.creator.account.username
                : ""}{" "}
            </div>
          </div>
          <div className="Number">
            <i class="fas fa-phone fa-flip-horizontal" />
            <div>Voir le numéro</div>
          </div>
        </section>
      </section>
    );
  }
}

export default CompleteOffer;
