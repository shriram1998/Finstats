import { SIGN_IN, SIGN_OUT,DISPOSE_DATA } from '../app/shared/ActionTypes';
import Data from '../apis';
import history from '../app/shared/history';
export const signIn = userDetails => {
    return{
        type: SIGN_IN,
        payload:userDetails
    };
}
export const signOut = () =>async dispatch=> {
    dispatch({ type: SIGN_OUT });
    dispatch({ type: DISPOSE_DATA});
    history.push('/');
}