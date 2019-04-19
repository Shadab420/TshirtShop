import axios from 'axios'
import { GET_ITEMS, ADD_ITEM, ITEM_SAVED, ITEM_SAVE_FAIL, ITEM_DELETED, ITEM_DELETE_FAIL, ITEMS_LOADING} from './types';

import { returnErrors } from './errorActions';


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

export const getItems = () => dispatch => {
		dispatch(setItemsLoading());
		axios.get('http://localhost:5000/api/products').then(res => dispatch({
			type: GET_ITEMS,
			payload: res.data
		}))
}


//Add new product
export const addProduct = (newProduct) => (dispatch, getState) => {
	

	//Request body

	axios.post('http://localhost:5000/api/products', newProduct, tokenConfig(getState))
		.then(res => dispatch({
			type: ITEM_SAVED,
		}))
		.catch(err => {
			dispatch(returnErrors(err.response.data, err.response.status, 'ITEM_SAVE_FAIL'));
			dispatch({
				type: ITEM_SAVE_FAIL
			});
		});
}

//delete product
export const deleteProducts = (products, deletedItems) => (dispatch,getState) => {

	deletedItems.map(item=>(

		axios.get('http://localhost:5000/api/products/delete/'+ products[item.index]._id, tokenConfig(getState))
		.then(res => dispatch({
			type: ITEM_DELETED,
		}))
		.catch(err => {
			dispatch(returnErrors(null, err.response.status, 'ITEM_DELETE_FAIL'))
			dispatch({
				type: ITEM_DELETE_FAIL
			})
		})

	))

	
}

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	}
}
