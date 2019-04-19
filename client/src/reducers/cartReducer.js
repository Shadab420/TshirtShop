import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, EMPTY_CART, INCREMENT_ITEM_COUNT, DECREMENT_ITEM_COUNT } from '../actions/types';

const initialState = {
	cartItems: [],
	itemCnt: 0,
	loading: false
}

export default function(state = initialState, action){
	switch(action.type){

		case ADD_ITEM_TO_CART:
			return{
				...state,
				cartItems: [...state.cartItems, action.payload]
			};

		case REMOVE_ITEM_FROM_CART:

			//getting index of the item in the cart array
			var removeIndex = state.cartItems.map((item) => { return item._id; }).indexOf(action.payload);

			state.cartItems.splice(removeIndex,1);

			return{
				...state,
				cartItems: state.cartItems
			};

		case EMPTY_CART:

			state.cartItems = [];
			state.itemCnt = 0;

			return{
				...state,
				cartItems: state.cartItems,
				itemCnt: state.itemCnt
			};

		case INCREMENT_ITEM_COUNT:
			return{
				...state,
				itemCnt: state.itemCnt+1
			};

		case DECREMENT_ITEM_COUNT:
			return{
				...state,
				itemCnt: state.itemCnt-1
			};
		
		default:
			return state;
	}
}