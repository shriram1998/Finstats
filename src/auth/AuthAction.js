import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, FETCH_ALL_DATA } from '../shared/ActionTypes';
import { fetchAllData,fetchHistory } from '../assets/AssetAction';
import history from '../shared/History';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import store from '../store';
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
export const registerUser = (user) => dispatch => {
    axios.post('/api/users/register', user)
            .then(res => history.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}
// function select(state) {
//     return state.auth.user.id;
// }

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            dispatch(fetchAllData());
            dispatch(fetchHistory());
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}

export const disposeErrors = () => dispatch => {
    dispatch({
                type: GET_ERRORS,
                payload: {}
            });
}