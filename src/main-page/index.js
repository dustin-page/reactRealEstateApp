import React, { Component } from 'react';
import './main-page.css';
import Header from '../shared-components/header';
import FeaturedHouse from './featured-house';
import HouseDetail from '../shared-components/house-detail';
import HouseFilter from '../shared-components/house-filter';
import SearchResults from '../search-results';

class App extends Component {

  //Initialize state inside the constructor function
  constructor(props) {
    super(props); //Call the base class constructor 'Component' with the 'props' argument
    //State object
    this.state = {}; //Set to empty object or provide initial values for some of the state properties used in this component
  }
  //Another way to set state is to use a 'property initializer' like this. Note its not a constructor and doesn't need to call super()
  //state = {};

  //Good place to call methods that make API requests is on the componentDidMount Lifecycle method of React
  //Called by React right after a component is mounted
  componentDidMount() {
    this.fetchHouses();
  }

  //Load the JSON with the fetch API
  //Polyfill for this is included in the template created by create-react-app
  fetchHouses = () => {
    fetch('./houses.json')
      .then(response => response.json()) //Get json from response
      .then(allHouses => {
        this.allHouses = allHouses; //With arrow functions "this" is always the lexical this. 
        //'this' is always a reference to what is directly around the arrow function; in this case the Class 'App' object

        this.determineFeaturedHouse();
        this.determineUniqueCountries();

      })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse = this.allHouses[randomIndex];
      this.setState({ featuredHouse }); //featuredHouse is stored in the state of the component. 
      //calling setState triggers re-render of the component
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    this.setState({ activeHouse: null });
    const filteredHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filteredHouses });
    this.setState({ country });
  }

  setActiveHouse = (house) => {
    this.setState({activeHouse: house});
  }

  render() {

    let activeComponent = null;
    //Render Components based on if statements
    if (this.state.country)
    activeComponent = <SearchResults country={this.state.country} 
      filteredHouses={this.state.filteredHouses} setActiveHouse={this.setActiveHouse} />;
    if (this.state.activeHouse)
      activeComponent = <HouseDetail house={this.state.activeHouse}/>;
    if (!activeComponent)
      activeComponent = <FeaturedHouse house={this.state.featuredHouse} />;

    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world" /> 
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses}/>
        {activeComponent}
        
      </div>
    );
  }
}

export default App;
 