import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};

const middleWare = [thunk];

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, initialState, persistedReducer, {}, compose(
// 	applyMiddleware(...middleWare),

// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));

// export default store;


const store = createStore(
		persistedReducer,
		compose(
			applyMiddleware(...middleWare),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		)
);

 const persistor = persistStore(store);

 export { store, persistor };
// export store ;
