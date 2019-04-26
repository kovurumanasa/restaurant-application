import React, { Component } from 'react';
import './signup.css';
import axios from "axios";
import { Link } from 'react-router-dom';

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            confirm: '',
            phoneNumber: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange(event) {
        this.setState({ userName: event.target.value });
        console.log('name', this.state.userName)
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
        console.log('name', this.state.email)
    }
    handlePhoneChange(event) {
        this.setState({ phoneNumber: event.target.value });
        console.log('name', this.state.phoneNumber)
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handleConfirmChange(event) {
        this.setState({ confirm: event.target.value });
    }
    handleSubmit(event) {
        if (this.state.password === this.state.confirm) {
            alert("pass match");
            let headers = {
                "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
                "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH",
                "X-Parse-Revocable-Session": "1",
                "Content-Type": "application/json"
            };
            let url = `https://parseapi.back4app.com/users`;
            let userData = {
                username: this.state.userName,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
                owner: false,
            }
            axios.post(url, userData, { headers }).then((response) => {
                console.log(response);
                if (response.status === 201) {
                    alert("successs");
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.props.history.push(`/`);
                }
            }).catch((error) => {
                console.log(error)
            });
        }
        else {
            alert("no match");
        }
        event.preventDefault();
    }
    handleRestaurantSubmit = () => {
        if (this.state.password === this.state.confirm) {
            alert("pass match");
            let headers = {
                "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
                "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH",
                "X-Parse-Revocable-Session": "1",
                "Content-Type": "application/json"
            };
            let url = `https://parseapi.back4app.com/users`;
            let userData = {
                username: this.state.userName,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
                owner: true,
            }
            axios.post(url, userData, { headers }).then((response) => {
                console.log(response);
                if (response.status === 201) {
                    alert("successs");
                    localStorage.setItem('user', JSON.stringify(response.data));
                    this.props.history.push(`/`);
                }
            }).catch((error) => {
                console.log(error)
            });
        }
        else {
            alert("no match");
        }
    }
    render() {
        return (
            <div className=" register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 register-left">
                            <img src="https://www.creativefabrica.com/wp-content/uploads/2018/10/Fast-Delivery-food-logo-by-DEEMKA-STUDIO-580x406.jpg" alt="logo" />
                            <h3>Welcome</h3>
                            <p>You are 30 minutes away from delicious foood!</p>
                            <Link to='/'><input type="submit" name="" value="Login" /><br /></Link>
                        </div>
                        <div className="col-md-9 register-right">
                            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Customer</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Owner</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <h3 className="register-heading">Register</h3>
                                    <div className="row register-form">
                                        <div className="col-12 form-group">
                                            <input type="text" className="form-control" placeholder="User Name *" value={this.state.username} onChange={this.handleUsernameChange} ></input>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Your Email *" value={this.state.email} onChange={this.handleEmailChange} />
                                            </div>

                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Confirm Password *" value={this.state.confirm} onChange={this.handleConfirmChange} ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password *" value={this.state.password} onChange={this.handlePasswordChange} ></input>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="Your Phone *" value={this.state.phoneNumber} onChange={this.handlePhoneChange} />
                                            </div>
                                            <input type="submit" className="btnRegister" value="Register" onClick={this.handleSubmit} />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <h3 className="register-heading">Register as a Owner</h3>
                                    <div className="row register-form">
                                        <div className="col-12 form-group">
                                            <input type="text" className="form-control" placeholder="Restaurant Name *" value={this.state.restaurantName} onChange={this.handleUsernameChange} ></input>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Your Email *" value={this.state.email} onChange={this.handleEmailChange} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Confirm Password *" value={this.state.confirm} onChange={this.handleConfirmChange} ></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password *" value={this.state.password} onChange={this.handlePasswordChange} ></input>
                                            </div>
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="Your Phone *" value={this.state.phoneNumber} onChange={this.handlePhoneChange} />
                                            </div>
                                            <input type="submit" className="btnRegister" value="Register" onClick={this.handleRestaurantSubmit} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default signup;