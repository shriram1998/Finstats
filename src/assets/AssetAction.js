import { FETCH_DATA,DISPOSE_DATA,EDIT_DATA,DELETE_DATA,CREATE_DATA } from '../app/shared/ActionTypes';
import Data from '../apis';
import history from '../app/shared/history';
export const fetchData = (id) => async dispatch => {
    const response = await Data.get(`/data/${id}`);
    dispatch({ type: FETCH_DATA, payload: response.data });
}

export const editData = (id,data) => async dispatch => {
    const response = await Data.patch(`/data/${id}`, data);
    dispatch({ type: EDIT_DATA, payload: response.data });
    history.push('/assets');
}
export const deleteData = (id, data) => async dispatch => {
    const response = await Data.put(`/data/${id}`, data);
    console.log(response.data);
    dispatch({ type: DELETE_DATA, payload: response.data });
    history.push('/assets');
}
export const createData = (id, data) => async dispatch => {
    const response = await Data.patch(`/data/${id}`, data);
    dispatch({ type: CREATE_DATA, payload: response.data });
    history.push('/assets');
}







