import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../../auth/GoogleAuth';
import { connect } from 'react-redux';
const Header=(props)=>{
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
                        {props.isSignedIn ? <Link to="/dashboard" className="item">Dashboard</Link> : null}
                        {props.isSignedIn ? <Link to="/assets" className="item">Assets</Link>:null}
                        <GoogleAuth />
                    </div>
                </div>
        );
    }
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn,userId:state.auth.userId};
}
export default connect(mapStateToProps,{})(Header);