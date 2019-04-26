import React, { Component } from 'react';
import axios from 'axios';
import RestaurantCard from './restaurantCard/restaurantCard';

export default class restaurant extends Component {
  constructor(props) {
    super(props);
    let id = localStorage.getItem('user');
    id = id.length > 0 ? JSON.parse(id).objectId: null;
    this.state = {
      restaurants: [],
      userId: id,
    }
  }
  render() {
    return (
      <div className="row">
        <RestaurantCard restaurant={this.state.restaurants}/>
      </div>
    )
  }
  componentWillMount() {
    let headers = {
      'X-Parse-Application-Id': 'kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB',
      'X-Parse-REST-API-Key': 'oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH'
    }
    let url = 'https://parseapi.back4app.com/classes/restaurants';
    axios.get(url, { headers })
      .then((response) => {
        console.log(response);
        let result = response.data.results;

        this.setState({ restaurants: result });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
