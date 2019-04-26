import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './restaurantCard.css';


export default class RestaurantCard extends Component {
  renderRating = (rating) => {
    const items = []
    for (let j = 0; j < rating; j++) {
      items.push(<i key={j} className="p-1 fa fa-star" style={{"color": "#ff8c00","fontSize": "20px"}}></i>)
    }
    return (
      <div>
        {items}
      </div>
    )
  }
  renderRestaurants(restaurants) {
    let RestArr = restaurants.map((value, key) => {
      let url = "/restaurant-detail/" + value.objectId;
      let rating = value.rating;
      return (<Link to={url} key={key}>
        <div className="card m-2" style={{ "width": "18rem;" }}>
          <img className="card-img-top" src={value.image.url} alt={value.name} style={{ "width": "360px", "height": "220px" }} />
          <div className="card-body">
            <div className="row">
              <h5 className="card-title text-uppercase col-6 text-left">{value.name}</h5>
              <div className="col-6 text-right">
                {this.renderRating(rating)}
              </div>
            </div>
            <div className="row">
              <p className="col-6 card-text text-left m-0 text-secondary"><i className="pr-2 fa fa-map-marker" style={{"color": "#ff8c00","fontSize": "20px"}}></i>{value.location}</p>
              <p className="col-6 text-right mb-1 text-secondary">${value.price} for two.</p>
            </div>
            <p className="text-left text-dark">Cuisine: {value.cuisine}</p>
          </div>
        </div>
      </Link>
      )
    })
    return RestArr;
  }
  render() {
    console.log(this.props, 'inside render functions');
    let restaurantArr = this.renderRestaurants(this.props.restaurant);
    return (
      <div className="container d-flex">
        {restaurantArr}
      </div>
    )
  }
}
