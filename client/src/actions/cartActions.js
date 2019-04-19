import axios from 'axios'
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, EMPTY_CART, INCREMENT_ITEM_COUNT, DECREMENT_ITEM_COUNT } from './types';

export const incrementItemCount = () => dispatch => {
	dispatch({
		type: INCREMENT_ITEM_COUNT
	})
}

export const decrementItemCount = () => dispatch => {
	dispatch({
		type: DECREMENT_ITEM_COUNT
	})
}

export const addToCart = (item) => dispatch => {

	if(item){
		dispatch({
			type: ADD_ITEM_TO_CART,
			payload: item
		})
	}
	else
	{

	}

}

export const removeFromCart = (itemId) => dispatch => {

	dispatch({
		type: REMOVE_ITEM_FROM_CART,
		payload: itemId
	})

	dispatch(decrementItemCount())

}

export const emptyCart = () => dispatch => {

	dispatch({
		type: EMPTY_CART
	})
}
