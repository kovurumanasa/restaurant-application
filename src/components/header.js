import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class Header extends Component {
  constructor(props) {
    let userId = localStorage.getItem('user');
    userId = JSON.parse(userId);
    console.log(userId, "user")
    super(props);
  }
  renderHomepage = () => {
    return (
      window.location = '/'
    );
  }
  checkLogin = () => {
    let loginUrl = '/';
    if (!localStorage.getItem('user')) {
      return <Link to={loginUrl}><div className="btn btn-primary my-2">Login Here!!!</div></Link>
    } else {
      return <Link to={loginUrl}><div className="btn btn-primary my-2" onClick={this.logout}>Logout!!</div></Link>
    }
  }
  yourOrders = () => {
    return <Link to="/previousOrder"><div className="btn btn-primary my-2">Your Orders!!!</div></Link>
  }
  logout = () =>{
    localStorage.removeItem('user');
  }
  render() {
    let url = "/cart";
    return (
      <nav className="navbar navbar-expand-lg navbar-light p-0 bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li>
              <img
                alt="logo"
                src='https://n5q9m8g6.stackpathcdn.com/wp-content/uploads/tflmx1562-400x250.png'
                style={{ "cursor": "pointer", "height": "70px", "width": "120px" }}
                className="p-0 nav-link"
                onClick={this.renderHomepage}
              />
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav ml-auto">
            <div className="nav-item">
              <li>
                <Link to={url}>
                  <i className="fa fa-shopping-cart pr-3" style={{ "color": "#ff8c00", "fontSize": "30px" }}></i>
                </Link>
                <i className="fa fa-user pr-3" data-toggle="dropdown" style={{ "cursor": "pointer", "color": "#ff8c00", "fontSize": "30px" }}></i>
                <ul id="login-dp" className="dropdown-menu" style={{ "left": "auto", "right": "0" }}>
                  <li>
                    <div className="row p-4">
                      <div className="col-md-12">
                        Hello {this.yourOrders()} {this.checkLogin()}
                      </div>
                    </div>
                  </li>
                </ul></li>
            </div>
          </ul>
        </div>
      </nav>
    )
  }
}


export default Header;