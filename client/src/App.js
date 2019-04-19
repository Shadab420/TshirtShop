import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar'
import AllProducts from './components/AllProducts';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadUser } from './actions/authActions';
import { persistStore } from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Products from './components/admin/Products';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

	

	componentDidMount(){

		
	}

	

  render() {
  
    return (
    	<Provider store = {store}>
	    	<PersistGate loading={null} persistor={persistor}> 
		      <div className="App">
		      	
		        

		        <Router>
		        	<AppNavbar/>
		       
		        	<Route path="/" component={AllProducts} exact />
		        	<Route path="/products" component={Products} />
		       	</Router>
		      </div>
	      	</PersistGate> 
	    </Provider>
    );
  }
}

export default App;
