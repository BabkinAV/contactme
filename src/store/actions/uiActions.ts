import { AppDispatch } from '../store';
import { setAuthenticated, setUserId } from '../slices/uiSlice';
import { setContacts, setFilter } from '../slices/dataSlice';


import { AxiosResponse } from 'axios';

import axios from 'axios';



export const loginAction = (user:{email: string, password: string}) =>(dispatch:AppDispatch) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_ADDRESS}/signin`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res:AxiosResponse<{
    accessToken: string,
    user: {
      email: string,
      id: number
    }
  }>) => {
    localStorage.setItem('IdToken', res.data.accessToken);
    dispatch(setAuthenticated(true));
    dispatch(setUserId(res.data.user.id));
  })
}

export const registerAction = (user:{email: string, password: string}) =>(dispatch:AppDispatch) => {
  return axios.post(`${process.env.REACT_APP_BACKEND_ADDRESS}/signup`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res:AxiosResponse<{
    accessToken: string,
    user: {
      email: string,
      id: number
    }
  }>) => {
    localStorage.setItem('IdToken', res.data.accessToken);
    dispatch(setAuthenticated(true));
    dispatch(setUserId(res.data.user.id));
  })
}

export const logoutAction =() => (dispatch:AppDispatch) => {
  dispatch(setUserId(null));
  dispatch(setContacts([]));
  dispatch(setFilter(''));
  dispatch(setAuthenticated(false));
  localStorage.removeItem('IdToken');

}