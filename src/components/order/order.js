import React, { Component } from 'react';
import axios from "axios";

class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            objId: []
        }
    }
    render() {
        return (
            <div>
                <h2>Your order has been placed</h2>
            </div>
        )
    }
    componentWillMount() {
        let headers = {
            "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
            "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
        };
        let userId = localStorage.getItem('user');
        userId = JSON.parse(userId).objectId;
        if (userId) {
            console.log(userId);
            let url = `https://parseapi.back4app.com/classes/cart?where={"userId":"${userId}"}`;
            axios.get(url, { headers })
                .then(response => {
                    console.log("hhhh", response.data.results);
                    let result = response.data.results;
                    this.setState({ cart: result });
                    let url = `https://parseapi.back4app.com/classes/order`;
                    let userData = {
                        userId: userId,
                        order: JSON.stringify(result),
                    }
                    let orderArr = this.state.cart.map((value) => {
                        this.setState({ objId: [...this.state.objId, value.objectId] })
                        return (value.objectId)
                    });
                    console.log('obj', userData)
                    axios.post(url, userData, { headers }).then((response) => {
                        console.log(response);
                        if (response.status === 201) {
                            alert("successs");
                            console.log(orderArr, "ooo")
                            for (let i = 0; i < this.state.objId.length; i++) {
                                console.log("j", this.state.objId[i])
                                let urlPath = `https://parseapi.back4app.com/classes/cart/${this.state.objId[i]}`;
                                axios
                                    .delete(urlPath, { headers })
                                    .then(response => {
                                        console.log("deleted")
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });
                            }
                        }
                    }).catch((error) => {
                        console.log(error)
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }
}
export default order;