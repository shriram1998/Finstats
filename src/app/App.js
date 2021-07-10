import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './shared/Header';
import HomePage from './LandingPage';
import Dashboard from '../assets/Dashboard';
import Assets from '../assets/AssetComponent';
import history from './shared/history';
import './App.css';
import DeleteAsset from '../assets/DeleteAsset';
import CreateAsset from '../assets/CreateAsset';
import EditAsset from '../assets/EditAsset';
const App = () => {
    return (<>
        <Router history={history}>
                <div className="ui container">
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
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
export default App;
