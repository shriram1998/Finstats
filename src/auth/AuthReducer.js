import { SET_CURRENT_USER } from '../shared/ActionTypes';
import isEmpty from '../shared/is-empty';
const INITIAL_STATE = {
    isAuthenticated: false,
    user:{}
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
};