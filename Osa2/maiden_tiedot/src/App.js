import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      list: [],
      search: ''
    }
  };

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data });
      });
  };

  searchCountries = (event) => {
    event.preventDefault();
    const search = event.target.value
    const list = this.state.countries.filter(function (country) {
      return country.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
    this.setState({ search: search, list: list })
  };

  render() {
    const toShow = () => {
      const list = this.state.list
      if (list.length === 0 && this.state.search.length > 0) {
        return <p>no country found with search</p>;
      } else if (list.length === 0 || list.length > 10) {
        return <p>too many manches, specify filter</p>;
      } else if (list.length === 1) {
        const country = list[0];
        return (
          <div>
            <h2>{country.name}</h2>
            Capital: {country.capital}<br />
            Population: {country.population}<br />
            <img src={country.flag} alt={`flag of ${country.name}`} width="25%" height="25%"/>
          </div>
        );
      } else {
        return (
          <ul style={{ listStyle: "none" }}>
            {list.map(country => <li key={country.alpha3Code} onClick={() => 
              this.setState({ list: [country], search: country.name })}>
            {country.name}</li>)}
          </ul>
        );
      }
    }

    return (
      <div>
        <div>
          find countries:
          <input
            onChange={this.searchCountries}
            value={this.state.search}
          />
        </div>
        {toShow()}
      </div>
    );
  };
}

export default App;