import { combineReducers } from 'redux';
import authReducer from '../auth/AuthReducer';
import assetReducer from '../assets/AssetReducer';
export default combineReducers({
    auth: authReducer,
    userData:assetReducer
});