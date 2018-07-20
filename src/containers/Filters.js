import React from "react";
import "./Filters.css";
const queryString = require("query-string");

class Filters extends React.Component {
  state = {
    title: "",
    priceMin: 0,
    priceMax: 0,
    sort: "date-asc",
    skip: 0,
    limit: 25
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
    if (this.state.priceMax === 0) {
      this.setState({
        priceMax: 99999
      });
    }

    const params = queryString.stringify(this.state);
    this.props.search(params);
    event.preventDefault();
  };

  increase = event => {
    console.log(this.props.nbrAnnonces);
    if (this.props.nbrAnnonces < 25)
      this.setState({
        skip: this.state.skip + 25,
        limit: this.state.limit + 25
      });
  };

  decrease = event => {
    if (this.state.skip > 0) {
      this.setState({
        skip: this.state.skip - 25,
        limit: this.state.limit - 25
      });
    }
  };

  render() {
    return (
      <form className="searchForm" onSubmit={this.onSubmit}>
        <div className="filters">
          <div className="first">
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Que recherchez-vous ? "
            />

            <div className="priceButton">
              <label htmlFor="email">Prix entre</label>
              <input
                id="priceMin"
                name="priceMin"
                type="Number"
                value={this.state.priceMin}
                onChange={this.handleChange}
                placeholder="Prix min"
              />
              <label htmlFor="email"> et </label>
              <input
                id="priceMax"
                name="priceMax"
                type="Number"
                value={this.state.priceMax}
                onChange={this.handleChange}
                placeholder="Prix max"
              />
            </div>
          </div>

          <div className="filtersButton">
            <button className="researchButton" type="submit">
              Rechercher
            </button>
            <select onChange={this.handleChange} name="sort" className="sort">
              <option value="price-desc">Prix décroissant</option>
              <option value="price-asc">Prix Croissant</option>
              <option value="date-asc">Date Croissante</option>
              <option value="date-desc">Date Décroissante</option>
            </select>
          </div>
        </div>
        <div className="previousNext">
          <button
            className="previousPage"
            type="submit"
            onClick={this.decrease}
          >
            Previous Page
          </button>
          <button className="nextPage" type="submit" onClick={this.increase}>
            Next Page
          </button>
        </div>
      </form>
    );
  }
}

export default Filters;
