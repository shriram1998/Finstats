import { FETCH_DATA,FETCH_ALL_DATA,EDIT_DATA,DELETE_DATA,CREATE_DATA } from '../shared/ActionTypes';
import Data from '../apis';
import axios from 'axios';
import history from '../shared/History';
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
export const createData = (data) => async dispatch => {
    const response = await axios.post("/api/instruments", data);
    dispatch({ type: CREATE_DATA, payload: response.data });
    history.push('/assets');
}

export const fetchAllData = () => async dispatch => {
    const response = await axios.get(`/api/instruments`);
    await dispatch({ type: FETCH_ALL_DATA, payload: response.data });
}






