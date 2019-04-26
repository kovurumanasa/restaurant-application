import React, { Component } from 'react';
import axios from "axios";

class previousOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
        }
    }
    orderList = (key) => {
        console.log("innn")
        console.log(this.state.order[key].cart, "listtt")
        let orderList = JSON.parse(this.state.order[key].cart);
        let list = orderList.map((value, key) => {
            return (
                <div className="m-2">{value.menuItem}</div>
            );
        });
        return list;
    }
    orderDetails = () => {
        let orderArr = this.state.order.map((value, key) => {
            return (
                <div key={key}>
                    <div className="border border-dark my-2">
                        <div className="col-6"><h3 className="text-left">{value.userName}</h3></div>
                        <div className="row">
                            <div className="col-6 px-4 text-left">
                                <h5>{value.address}</h5>
                            </div>
                            <div className="col-6 px-4 text-right">
                                <h5>{value.phoneNumber}</h5>
                            </div>
                        </div>
                        <div className="row mx-2">{this.orderList(key)}</div>
                    </div>
                </div>
            );
        });
        return orderArr;
    }
    render() {
        console.log(this.state.order)
        return (
            <div className="container">
                <h2 className="text-left">Your Orders</h2>{this.orderDetails()}
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
            userId = JSON.parse(userId).objectId;
            let url = `https://parseapi.back4app.com/classes/checkOut?where={"userId":"${userId}"}`;
            axios
                .get(url, { headers })
                .then(response => {
                    console.log("heloooo", response.data.results);
                    let result = response.data.results;
                    this.setState({ order: result });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}
export default previousOrders;