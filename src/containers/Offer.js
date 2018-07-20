import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";

function Offer(props) {
  let picture = null;
  if (props.picture) {
    picture = <img src={props.picture} />;
  } else {
    picture = <img src="img/lbc.png" />;
  }

  let price = null;
  if (props.price) {
    price = props.price;
  } else {
    price = 100;
  }

  let link = "/offer/" + props._id;

  return (
    <Link to={link} className="anOffer">
      <div className="id">{props._id}</div>
      <div className="offerPicture">
        <div className="picture">{picture}</div>
      </div>
      <div className="MyInfos">
        <div className="title">{props.title}</div>
        <div className="description">{props.description}</div>
        <div className="price">
          {price}
          {" €"}
        </div>
      </div>
    </Link>
  );
}

export default Offer;
