import React, { Component } from 'react';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';

class user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit = (event) => {
        console.log("email", this.state.email, this.state.password);
        // event.preventDefault();
        let headers = {
            'X-Parse-Application-Id': 'kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB',
            'X-Parse-REST-API-Key': 'oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH'
        }
        let email = this.state.email;
        let password = this.state.password;
        let url = `https://parseapi.back4app.com/login?username=${email}&password=${password}`;
        axios.get(url, { headers })
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                this.setState({
                    user: response.data,
                    loggedIn: true
                })
                console.log(this.state.user,"infooo")
            })
            .catch(error => {
                console.error(error);
                alert("Please enter valid credentials");
            });
    }
    render() {
        let url = "/signup";
        console.log(this.state.loggedIn)
        return (
            this.state.loggedIn ? this.state.user.owner ? <Redirect to="/restaurants/owner" /> : <Redirect to="/restaurants/user" /> :
                <div className=" register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 register-left">
                                <img src="https://www.creativefabrica.com/wp-content/uploads/2018/10/Fast-Delivery-food-logo-by-DEEMKA-STUDIO-580x406.jpg" alt="logo" />
                                <h3>Welcome</h3>
                                <p>You are 30 minutes away from delicious foood!</p>
                                <Link to={url}><input type="submit" name="" value="Sign Up" /><br /></Link>
                            </div>
                            <div className="col-md-9 register-right">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <h3 className="register-heading">Login</h3>
                                        <div className="row register-form">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" placeholder="Your Email *" value={this.state.email} onChange={this.handleEmailChange} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" placeholder="Password *" value={this.state.password} onChange={this.handlePasswordChange} ></input>
                                                </div>
                                                <input type="button" className="btnRegister" value="Login" onClick={this.handleSubmit} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
        )
    }
    componentWillMount() {
        let headers = {
            "X-Parse-Application-Id": "kDZv9yhkGiS3FA7zK8sVBSgWJJWc8t9IEP7ixNWB",
            "X-Parse-REST-API-Key": "oUn2SfvAWKLK0dXQyUCGup0YvXcik3CYDr4MhooH"
        };
        let url = `https://parseapi.back4app.com/classes/User`;
        axios
            .get(url, { headers })
            .then(response => {
                let result = response.data.results;
                this.setState({
                    userInfo: result
                });

            })
            .catch(error => {
                console.log(error);
            });
    }
}
export default user;