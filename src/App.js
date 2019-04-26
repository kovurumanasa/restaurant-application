import React, { Component } from 'react';
import './App.css';
import Footer from './components/footer';
import Restaurant from './components/restaurant';
import Menu from './components/menu/menu';
import RestaurantDetail from './components/restaurantDetail/restaurantDetail';
import User from './components/user/user';
import Signup from './components/signup/signup';
import Cart from './components/cart/cart';
import Header from './components/header';
import { Route, Switch } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom';
import Checkout from './components/checkout/checkout';
import Order from './components/order/order';
import PreviousOrders from './components/previousOrders/previousOrders';
import Owner from './components/owner/owner';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path='/' component={User} exact />
            <Route path='/signup' component={Signup} />
            <Route path='/restaurants/user' component={Restaurant} />
            <Route path='/restaurant-menu' component={Menu} />
            <Route path='/restaurant-detail/:userId' component={RestaurantDetail} />
            <Route path='/cart' component={Cart} exact />
            <Route path='/checkout' component={Checkout} />
            <Route path='/order' component={Order} />
            <Route path='/previousOrder' component={PreviousOrders} />
            <Route path='/restaurants/owner' component={Owner} />
          </Switch>
        </Router>
        <Footer />
      </div>
    );
  }



}

export default App;
