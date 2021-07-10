import { SIGN_IN, SIGN_OUT } from '../app/shared/ActionTypes';
const INITIAL_STATE = {
    isSignedIn: false,
    userId: null,
    userName:null
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId:action.payload['Id'], userName:action.payload['Name'] };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId:null,userName:null};
        default:
            return state;
    }
};