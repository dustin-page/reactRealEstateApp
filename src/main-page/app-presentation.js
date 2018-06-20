//Function component that only has the render part of the main-page 'App' component

import React from 'react';
import './main-page.css';
import Header from '../shared-components/header';
import FeaturedHouse from './featured-house';
import HouseDetail from '../shared-components/house-detail';
import HouseFilter from '../shared-components/house-filter';
import SearchResults from '../search-results';

const AppPresentation = (props) => {
    let activeComponent = null;
    //Render Components based on if statements
    if (props.country)
        activeComponent = <SearchResults country={props.country}
            filteredHouses={props.filteredHouses} setActiveHouse={props.setActiveHouse} />;
    if (props.activeHouse)
        activeComponent = <HouseDetail house={props.activeHouse} />;
    if (!activeComponent)
        activeComponent = <FeaturedHouse house={props.featuredHouse} />;

    return (
        <div className="container">
            <Header subtitle="Providing houses all over the world" />
            <HouseFilter countries={props.countries} filterHouses={props.filterHouses} />
            {activeComponent}
        </div>
    );
}

export default AppPresentation;