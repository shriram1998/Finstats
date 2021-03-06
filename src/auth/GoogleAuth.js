// import React from 'react';
// import { connect } from 'react-redux';
// import { signIn, signOut } from './AuthAction';
// class GoogleAuth extends React.Component{
//     componentDidMount(){
//         window.gapi.load('client:auth2', () => {
//             window.gapi.client.init({
//                 clientId: '823967839849-n1oqdr121rqredhisdbkj1euc3n562ps.apps.googleusercontent.com',
//                 scope:'email'
//             }).then(() => {
//                 this.auth = window.gapi.auth2.getAuthInstance();
//                 this.onAuthChange(this.auth.isAuthenticated.get());
//                 this.auth.isAuthenticated.listen(this.onAuthChange);
//             })
//         })
//     }
//     onAuthChange = (isAuthenticated) => {
//         if (isAuthenticated) {
//             this.props.signIn({ Id: this.auth.currentUser.get().getBasicProfile().getId(),Name:this.auth.currentUser.get().getBasicProfile().getName() });
//         } else {
//             this.props.signOut();
//         }
//     }
//     renderAuthButton() {
//         if (this.props.isAuthenticated) {
//             return (<>
//                 <button id="signout" className="ui button grey" onClick={() => { this.auth.signOut() }}>Sign Out - {this.props.userName }</button>
//             </>)}
//         else {
//             return (<>
//                 <button id="signin" className="ui button primary" onClick={() => { this.auth.signIn() }}>Sign In</button>
//             </>)
//         }
//     }
//     render() {
//         return <>{ this.renderAuthButton()}</>
//     }
// }
// const mapStateToProps = (state) => {
//     return { isAuthenticated: state.auth.isAuthenticated,userName:state.auth.userName };
// }
// export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);