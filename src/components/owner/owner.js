import React, { Component } from 'react';
import axios from "axios";

class owner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rating: '',
            price: '',
            location: '',
            MenuId: '',
            cuisine: '',
            selectedDocument: {
                file: null,
            },
            selectedFile: null,
        }
    }
    handleName = (event) => {
        this.setState({ name: event.target.value })
    }
    handleLocation = (event) => {
        this.setState({ location: event.target.value })
    }
    handlePrice = (event) => {
        this.setState({ price: parseInt(event.target.value) })
    }
    handleRating = (event) => {
        this.setState({ rating: parseInt(event.target.value) })
    }
    handleCuisine = (event) => {
        this.setState({ cuisine: event.target.value })
    }
    handleImage = (event) => {
        console.log(event)
    }
    saveInfo = () => {
        console.log(this.state, "ghkdhkfhjhd")
        let headers = {
            'X-Parse-Application-Id': 'kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB',
            'X-Parse-REST-API-Key': 'oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH'
        }
        let url = `https://parseapi.back4app.com/classes/restaurants`;
        let data = {
            "name": this.state.name,
            "image": this.state.image,
            "location": this.state.location,
            "MenuId": {
                "__type": "Pointer",
                "className": "menu",
                "objectId": "<THE_REFERENCED_OBJECT_ID>"
            },
            "price": this.state.price,
            "rating": this.state.rating,
            "cuisine": this.state.cuisine
        }
        axios.post(url, data, { headers }).then((response) => {
            console.log(response);
            if (response.status === 201) {
                alert("successs");
            }
        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        return (
            <div className="container my-4">
                <form>
                    <h2 className="text-left">Restaurant Information</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Enter Restaurant Name" onChange={this.handleName} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Location" onChange={this.handleLocation} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="price for two" onChange={this.handlePrice} />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="rating" onChange={this.handleRating} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Cuisine" onChange={this.handleCuisine} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" onChange={this.handleImage}/>
                    </div>
                    <input type="button" className="btn btn-primary" value="Submit" onClick={this.saveInfo}></input>
                </form>
            </div>
        )
    }
}
export default owner;