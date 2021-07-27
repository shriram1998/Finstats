import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../shared/Header';
import HomePage from './LandingPage';
import Dashboard from '../assets/Dashboard';
import history from '../shared/History';
import Register from '../auth/Register';
import Login from '../auth/Login';
import setAuthToken from '../auth/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser,logoutUser } from '../auth/AuthAction';
import store from '../store';
import Assets from '../assets/AssetComponent';
import DeleteAsset from '../assets/DeleteAsset';
import CreateAsset from '../assets/CreateAsset';
import EditAsset from '../assets/EditAsset';
import './App.css';
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}
export default function App() {
   const api_regex = /^\/api\/.*/
    if (api_regex.test(window.location.pathname)) {
        return <div />
    } else {
        return (<>
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/assets" exact component={Assets} />
                        <Route path="/assets/delete/:key" exact component={DeleteAsset} />
                        <Route path="/assets/edit/:key" exact component={EditAsset} />
                        <Route path="/assets/create" exact component={CreateAsset} />
                    </Switch>
                </div>
            </Router>
        </>)
    }
}
