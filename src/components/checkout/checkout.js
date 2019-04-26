import React, { Component } from 'react';
import './checkout.css';
import axios from "axios";

class checkout extends Component {
    constructor(props) {
        super(props);
        let user = localStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        this.state = {
            userName: user.username,
            email: user.email,
            phone: user.phoneNumber,
            id: user.objectId,
            address: '',
            zip: '',
            region: '',
            cart: [],
            total: ''
        }
    }
    handleName = (event) => {
        this.setState({ userName: event.target.value });
    }
    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePhone = (event) => {
        this.setState({ phone: event.target.value });
    }
    handleAddress = (event) => {
        this.setState({ address: event.target.value });
    }
    handleZip = (event) => {
        this.setState({ zip: parseInt(event.target.value) });
    }
    handleState = (event) => {
        this.setState({ region: event.target.value });
    }
    subTotal = () => {
        let totalPrice = 0;
        let previousPrice = this.state.total;
        this.state.cart.map(value => {
            totalPrice += value.price;
            return '';
        })
        if (previousPrice !== totalPrice) {
            this.setState({ total: totalPrice });
        }
        return totalPrice;
    }
    renderCart = (cart) => {
        let CartArr = cart.map((value, key) => {
            return (
                <tr key={key}>
                    <th>{++key}</th>
                    <td>{value.menuItem}</td>
                    <td>{value.quantity}</td>
                    <td>{value.price}</td>
                </tr>
            );
        });
        return CartArr;
    }
    saveCheckout = () => {
        let HEADERS = {
            "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
            "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
        };
        let url = 'https://parseapi.back4app.com/classes/checkOut';
        let headers = HEADERS;
        let details = {
            userName: this.state.userName,
            phoneNumber: this.state.phone,
            address: this.state.address,
            state: this.state.region,
            zip: this.state.zip,
            userId: this.state.id,
            cart: JSON.stringify(this.state.cart),
        }
        axios.post(url, details, { headers }).then((response) => {
            alert("checkout done")
        })
        .catch(error => {
            console.log(error);
          });
        return (window.location = '/order')
    }
    render() {
        console.log("after", this.state)
        return (
            <div className="container row m-auto p-2">
                <div className="content col-8">
                    <h2>Checkout</h2>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group text-left">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" defaultValue={this.state.userName} onChange={this.handleName} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group text-left">
                                <label>Email-id</label>
                                <input type="text" className="form-control" id="email" defaultValue={this.state.email} onChange={this.handleEmail} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group text-left">
                                <label>Phone Number</label>
                                <input type="number" className="form-control" id="phone" defaultValue={this.state.phone} onChange={this.handlePhone} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group text-left">
                                <label>House number</label>
                                <input type="text" className="form-control" onChange={this.handleAddress} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group text-left">
                                <label>State</label>
                                <input type="text" className="form-control" id="state" onChange={this.handleState} />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group text-left">
                                <label>zip</label>
                                <input type="number" className="form-control" id="zip" onChange={this.handleZip} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 border border-dark">
                    <div>
                        <h3>Order Details</h3><table className="col-12"><tbody>{this.renderCart(this.state.cart)}</tbody></table>
                        <div className="p-5 text-right">Sub-total: {this.subTotal()}</div>
                    </div>
                </div>
                <div className="col-12 text-right m-2">
                    <div className="btn btn-primary" onClick={this.saveCheckout}>Place order</div>
                </div>
            </div>
        )
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
export default checkout;