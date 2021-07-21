import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../auth/GoogleAuth';
import { connect } from 'react-redux';
import history from './History';
import { logoutUser } from '../auth/AuthAction';
const Header = (props) => {
    let headerElems=null;
    if (props.isAuthenticated) {
        headerElems = (
            <>
                <Link to="/dashboard" className="item">Dashboard</Link>
                <Link to="/assets" className="item">Assets</Link>
                <button className="ui button gray auth" onClick={ props.logoutUser}>Logout</button>
            </>
        );
    }
    else {
        headerElems = (
            <>
                <Link className="ui button gray auth" to='/register'>Register</Link>
                <Link className="ui button primary auth" to='/login'>Login </Link>
                
            </>
        );
    }
    return (
        <div className="ui large stackable secondary menu transition headerNav">
            <div className="left menu">
                <Link to="/" className="ui header item">
                    <i className="large money bill alternate icon"></i> Finstats
                </Link>
            </div>
            <div className="right menu">
                <Link to="/" className="active item">Home</Link>
                <Link to="/" className="item">About</Link>
                { headerElems}
                {/* <GoogleAuth /> */}
            </div>
        </div>
    );
    }
const mapStateToProps = (state) => {
    return { isAuthenticated: state.auth.isAuthenticated,user:state.auth.id};
}
export default connect(mapStateToProps,{logoutUser})(Header);