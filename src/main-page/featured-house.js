import React from 'react';
import HouseDetail from '../shared-components/house-detail';

const FeaturedHouse = (props) => {
    if (props.house) return (
        <div>
            <div className="row featuredHouse">
                <h3 className="col-md-12 text-center">
                    Featured House
                </h3>
            </div>
            <HouseDetail />
        </div>
    );
    return (
        <div>No featured house at this time</div>
    );
};




export default FeaturedHouse;


