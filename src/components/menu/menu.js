import React, { Component } from "react";
import axios from "axios";
import '../../App.css';

export default class Menu extends Component {

  constructor(props) {
    super(props);
    console.log('cons', props);
    this.state = {
      menu: [],
      menuId: props.menuId,
      quantity: {},
      price: '',
      count: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  addToCart(menuItem) {
    // console.log("cart", menuItem);
    let HEADERS = {
      "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
      "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
    };
    let url = 'https://parseapi.back4app.com/classes/cart';
    let headers = HEADERS;
    let userId = localStorage.getItem('user');
    userId = JSON.parse(userId);

    let itemQuantity = (this.state.quantity[menuItem.itemName]);
    console.log("mANasa", itemQuantity)
    let menuList = {
      menuItem: menuItem.itemName,
      quantity: itemQuantity,
      price: itemQuantity * menuItem.itemPrice,
      userId: userId.objectId,
    }
    axios.post(url, menuList, { headers }).then((response) => {    
      this.setState({
        count : this.state.count + 1,
      })
      alert(this.state.count)
    });
  }
  handleChange(event) {
    let name = event.target.name;
    let value = parseInt(event.target.value);
    this.setState({
      quantity: {
        ...this.state.quantity,
        [name]: value
      }
    });
  }
  renderMenuItems = items => {
    let MenuItems = items.map((value, key) => {
      return (
        <div className="card m-3 w-25 p-0 col-3" key={key}>
          <div className="card-header">{value.itemName}</div>
          <div className="card-body">
            <div className="row my-2">
              <div className="col-4">Price: ${value.itemPrice} </div>
              <div className="offset-3 col-4">
                <label>Quantity:</label>
                <input type="number" min="1" placeholder="0" name={value.itemName} value={this.state.quantity[value.itemName]} step="1" max="5" onChange={event => this.handleChange(event)}></input>
              </div>
            </div>
            <div className="">
              <button className="btn btn-primary" onClick={() => this.addToCart(value)}>Add to Cart</button>
            </div>
          </div>
        </div >
      );
    });
    return MenuItems;
  };
  renderMenu(menu) {
    let MenuArr = menu.map((value, key) => {
      let breakfast = value.breakfast;
      breakfast = JSON.parse(breakfast);
      let lunch = value.lunch;
      lunch = JSON.parse(lunch);
      let snacks = value.snacks;
      snacks = JSON.parse(snacks);
      let dinner = value.dinner;
      dinner = JSON.parse(dinner);
      return (
        <div key={key} className="container">
          <div className="shadow p-3 mt-5 bg-white rounded">
            <h2 className="text-left border-bottom">Breakfast</h2>
            <div className="d-flex flex-wrap w-100 justify-content-around">{this.renderMenuItems(breakfast)}</div>
          </div>
          <div className="shadow p-3 mt-5 bg-white rounded">
            <h2 className="text-left border-bottom">Lunch</h2>
            <div className="d-flex flex-wrap w-100 justify-content-around">{this.renderMenuItems(lunch)}</div>
          </div>
          <div className="shadow p-3 mt-5 bg-white rounded">
            <h2 className="text-left border-bottom">Snacks</h2>
            <div className="d-flex flex-wrap w-100 justify-content-around">{this.renderMenuItems(snacks)}</div>
          </div>
          <div className="shadow p-3 mt-5 bg-white rounded">
            <h2 className="text-left border-bottom">Dinner</h2>
            <div className="d-flex flex-wrap w-100 justify-content-around">{this.renderMenuItems(dinner)}</div>
          </div>
        </div>
      );
    });
    return MenuArr;
  }

  render() {
    let menu = this.renderMenu(this.state.menu);
    console.log('menuuu', this.state, this.props);
    return <div>{menu}</div>;
  }
  componentWillMount() {
    let headers = {
      "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
      "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
    };
    let url = `https://parseapi.back4app.com/classes/menu?where={"objectId": "${
      this.state.menuId
      }"}`;
    axios
      .get(url, { headers })
      .then(response => {
        console.log("hhhh", response.data.results);
        let result = response.data.results;

        this.setState({ menu: result });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
