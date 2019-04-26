import React, { Component } from "react";
import axios from "axios";
import Menu from "../menu/menu";

export class restaurantDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantDetail: [],
      Id: this.props.match.params.userId,
      menuId: null
    };
  }
  renderRating = (rating) => {
    const items = []
    for (let j = 0; j < rating; j++) {
      items.push(<i key={j} className="p-1 fa fa-star" style={{ "color": "#ff8c00", "fontSize": "20px" }}></i>)
    }
    return (
      <div>
        {items}
      </div>
    )
  }
  renderRestaurants(restaurants) {
    let RestArr = restaurants.map((value, key) => {
      let rating = value.rating;
      return (
        <div key={key}>
          <div
            className="banner-bg row col-lg-12 p-0 m-0"
            style={{
              height: "150px",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)) , url(${value.image.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="container pt-5">
              <div className="row">
                <h1 className="col-lg-8 text-left text-uppercase text-white">{value.name}</h1>
                <div className="col-lg-2 text-right text-capitalize font-weight-bold text-white">{value.location}</div>
                <div className="col-lg-2 text-right text-white">${value.price} for two.</div>
              </div>
            </div>
          </div>
          <div className="container-fluid border-bottom bg-white m-0 col-12">
            <div className="container py-2 row m-auto">
              <div className="col-6 text-left p-0">
                {this.renderRating(rating)}
              </div>
              <div className="col-6 text-secondary text-right p-0">
                {value.cuisine}
              </div>
            </div>
          </div>
          <Menu menuId={this.state.menuId} />
        </div>
      );
    });
    return RestArr;
  }
  render() {
    let len = this.state.restaurantDetail.length;
    return (
      (len > 0) ?
        <div>
          <div className="container-fluid p-0">{this.renderRestaurants(this.state.restaurantDetail)}</div>
        </div>
        :
        ""
    );
  }
  componentWillMount() {
    let headers = {
      "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
      "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
    };
    let url = `https://parseapi.back4app.com/classes/restaurants?where={"objectId": "${
      this.state.Id
      }"}`;
    axios
      .get(url, { headers })
      .then(response => {
        let result = response.data.results;
        this.setState({
          restaurantDetail: result,
          menuId: result[0].MenuId.objectId,
        });

      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default restaurantDetail;
