import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import "./Header.css";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };
  renderNav() {
    if (this.props.user._id) {
      return (
        <ul className="buttons">
          <React.Fragment>
            <li>
              <NavLink to="/" className="headerButton offers">
                Offres
              </NavLink>
            </li>
            <li>
              <NavLink to="/publish" className="headerButton connect">
                Déposer une annonce
              </NavLink>
            </li>
            <li>
              <NavLink
                className="profile"
                to={"/profile/" + this.props.user._id}
              >
                {this.props.user.username}
              </NavLink>
            </li>
            <li>
              <button onClick={this.onLogOut}>Déconnexion</button>
            </li>
          </React.Fragment>
        </ul>
      );
    }
    return (
      <ul className="buttons">
        <li>
          <NavLink to="/" className="headerButton offers">
            Offres
          </NavLink>
        </li>
        <li>
          <NavLink to="/log_in" className="headerButton connect">
            Déposer une annonce
          </NavLink>
        </li>{" "}
        <li>
          <NavLink to="/sign_up" className="headerButton create">
            Créer un compte
          </NavLink>
        </li>{" "}
        <li>
          <NavLink to="/log_in" className="headerButton connect">
            Se connecter
          </NavLink>
        </li>{" "}
      </ul>
    );
  }
  render() {
    return (
      <header>
        <div className="container headerContainer">
          <Link to="/">
            <img className="logo" src="/img/Leboncoin.fr_Logo_2016.svg" />
          </Link>
          <ul className="nav-list">{this.renderNav()}</ul>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
