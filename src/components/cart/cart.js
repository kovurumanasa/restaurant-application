import React, { Component } from 'react';
import axios from "axios";
import '../../App.css';
import { Link } from 'react-router-dom';


class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }
  handleChange = (key, event) => {
    let value = parseInt(event.target.value);
    let updatedCart = this.state.cart;
    updatedCart[key].quantity = value;
    this.setState({
      cart: updatedCart
    });
    let headers = {
      "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
      "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
    };
    let objectId = this.state.cart[key].objectId;
    console.log(objectId)
    let url = `https://parseapi.back4app.com/classes/cart/${objectId}`;
    let data = {
      quantity: value
    }
    axios.put(url, data, { headers }).then((response) => {
      alert("Item updated to cart!!!!!")
    });
  }
  handleDelete = (key, event) => {
    let headers = {
      "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
      "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
    };
    let objectId = this.state.cart[key].objectId;
    console.log(objectId)
    let url = `https://parseapi.back4app.com/classes/cart/${objectId}`;
    axios.delete(url, { headers }).then((response) => {
      alert("Item deleted")
    });
  }
renderCart = (cart) => {
  let CartArr = cart.map((value, key) => {
    return (
      <tr key={key}>
        <th>{key + 1}</th>
        <td>{value.menuItem}</td>
        <td><input type="number" min="1" placeholder="1" name={value.itemName} value={value.quantity} step="1" max="5" onChange={(event) => this.handleChange(key, event)}></input></td>
        <td>{value.price}</td>
        <td><i className="fa fa-trash" aria-hidden="true" style={{"cursor": "pointer"}} onClick={(event) => this.handleDelete(key, event)}></i></td>
      </tr>
    );
  });
  return CartArr;
}
render() {
  console.log(this.state.cart, "carttt")
  return (
    <div className="container p-0">
      <table className="table">
        <thead className="background-orange">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody className="bg-white container p-0">{this.renderCart(this.state.cart)}</tbody>
      </table>
      <div className="col-12 text-right">
        <Link to='/checkout'>
          <div className="btn btn-primary">Proceed to checkout</div>
        </Link>
      </div>
    </div>
  )
}
emptyCart = () => {
  alert("Login to add items")
  return (window.location = '/')
}
componentWillMount() {
  let headers = {
    "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
    "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
  };
  let userId = localStorage.getItem('user');
  if (userId) {
    console.log(userId);
    userId = JSON.parse(userId).objectId;
    let url = `https://parseapi.back4app.com/classes/cart?where={"userId":"${userId}"}`;
    axios
      .get(url, { headers })
      .then(response => {
        console.log("hhhh", response.data.results);
        let result = response.data.results;
        this.setState({ cart: result });
      })
      .catch(error => {
        console.log(error);
      });
  }
  else {
    this.emptyCart();
  }
}
}

export default cart;