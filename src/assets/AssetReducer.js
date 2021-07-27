import { FETCH_DATA,FETCH_ALL_DATA, CREATE_DATA, EDIT_DATA, DELETE_DATA,DISPOSE_DATA, FETCH_HISTORY } from '../shared/ActionTypes';
import _ from 'lodash';
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_ALL_DATA:
            return {...state, ['overview']: action.payload };
        case FETCH_HISTORY:
            return { ...state, ['history']: action.payload };
        case EDIT_DATA:
            return { ...state, [action.payload.id]: action.payload }; 
        case DELETE_DATA: 
            return { ...state, [action.payload.id]: action.payload };
        case DISPOSE_DATA:
            return {}
        default:
            return state;
    }
}