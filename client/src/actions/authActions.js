import axios from 'axios';

import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL
} from './types';

import { returnErrors } from './errorActions';

//Check token and load user
export const loadUser = () => (dispatch, getState) => {

	//User loading
	dispatch({ type: USER_LOADING });

	axios.get('/api/auth/user', tokenConfig(getState))
		.then(res => dispatch({
			type: USER_LOADED,
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
}

//setup config/header and token
export const tokenConfig = getState => {
	//get token from localstorage
	const token = getState().auth.token;

	//headers
	const config = {
		headers: {
			"Content-type": "application/json",

		}
	}

	//If token, add to headers
	if(token){
		config.headers['x-auth-token'] = token;
	}

	return config;
}


//Register user
export const register = (newUser) => dispatch => {
	//headers
	const config = {
		header: {
			'Content-Type': 'application/json'
		}
	}

	//Request body

	axios.post('http://localhost:5000/api/users', newUser, config)
		.then(res => dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL
			});
		});
}


//Login user
export const login = (loginData) => dispatch => {
	//headers
	const config = {
		header: {
			'Content-Type': 'application/json'
		}
	}

	//Request body

	axios.post('http://localhost:5000/api/auth', loginData, config)
		.then(res => dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
			dispatch({
				type: LOGIN_FAIL
			});
		});
}

//logout user
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS
	}
}