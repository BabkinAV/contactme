import { AppDispatch } from '../store';
import { setAuthenticated, setUserId } from '../slices/uiSlice';
import { setContacts, setFilter } from '../slices/dataSlice';


import { AxiosError, AxiosResponse } from 'axios';

import axios from 'axios';

const uri = 'http://localhost:5000/signin';


export const loginAction = (user:{email: string, password: string}) =>(dispatch:AppDispatch) => {
  return axios.post(uri, user, {
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
    console.log(res.data.accessToken)
    dispatch(setAuthenticated(true));
    dispatch(setUserId(res.data.user.id));
  })
}

export const registerAction = (user:{email: string, password: string}) =>(dispatch:AppDispatch) => {
  return axios.post('http://localhost:5000/signup', user, {
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
    dispatch(setAuthenticated(true));
    dispatch(setUserId(res.data.user.id));
  })
}

export const logoutAction =() => (dispatch:AppDispatch) => {
  dispatch(setUserId(null));
  dispatch(setContacts([]));
  dispatch(setFilter(''));
  dispatch(setAuthenticated(false));

}