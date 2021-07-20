import { combineReducers } from 'redux';
import authReducer from '../auth/AuthReducer';
import assetReducer from '../assets/AssetReducer';
import errorReducer from '../auth/ErrorReducer';
export default combineReducers({
    auth: authReducer,
    userData: assetReducer,
    errors:errorReducer
});