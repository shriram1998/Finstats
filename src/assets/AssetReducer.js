import { FETCH_DATA, CREATE_DATA, EDIT_DATA, DELETE_DATA,DISPOSE_DATA } from '../app/shared/ActionTypes';
import _ from 'lodash';
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_DATA:
            return { ...state, [action.payload.id]: action.payload };
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