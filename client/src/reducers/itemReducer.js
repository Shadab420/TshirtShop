import uuid from 'uuid';
import { GET_ITEMS, ADD_ITEM, ITEM_SAVED, ITEM_SAVE_FAIL, ITEM_DELETED, ITEM_DELETE_FAIL, ITEMS_LOADING} from '../actions/types';

const initialState = {
	tshirts: [],
	loading: false,
}

export default function(state = initialState, action){
	switch(action.type){
		case GET_ITEMS:
			return{
				...state,
				tshirts: action.payload,
				loading: false
			};
		case ITEMS_LOADING:
			return{
				...state,
				loading: true
			};

		case ITEM_SAVED:
			return{
				...state,
				loading:false,
			};
		case ITEM_DELETED, ITEM_DELETE_FAIL:
			return{
				...state,
				loading:false,
			};
		default:
			return state;
	}
}