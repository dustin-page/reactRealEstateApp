import React, { Component } from 'react';
import './main-page.css';
import Header from '../shared-components/header';

class App extends Component {

  //Initialize state inside the constructor function
  constructor(props) {
    super(props); //Call the base class constructor 'Component' with the 'props' argument
    //State object
    this.state = {}; //Set to empty object or provide initial values for some of the state properties used in this component
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

  render() {
    return (
      <div className="container">
        <Header subtitle="Providing houses all over the world" /> 
      </div>
    );
  }
}

export default App;
