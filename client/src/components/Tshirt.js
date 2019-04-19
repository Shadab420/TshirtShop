import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TshirtDetail from './TshirtDetail';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementItemCount, addToCart, removeFromCart } from  '../actions/cartActions';


class Tshirt extends React.Component  {

	state = {
		addedToCart: false,
	}

	addItemToCart = tshirt =>{
		this.props.incrementItemCount();
		this.props.addToCart(tshirt);
		this.setState({ addedToCart: true });

	}

	removeFromCart = tshirtId => {
		this.props.removeFromCart(tshirtId);
		this.setState({ addedToCart: false });
	}
	

	 render() {

	 	const { tshirt } = this.props;
	 	const { addedToCart } = this.state;

			return(

				

				<div>
					{ tshirt ? (

						<Card>
							<CardMedia style={{ height: 0, paddingTop: '56.25%', backgroundSize: 'contain', backgroundColor: 'burlywood'}}
								image = { tshirt.image1 }
								name = { tshirt.name }
							/>

							<CardContent style={{ backgroundColor: 'darkgray' }}>
								<Typography gutterBottom variant="headline" component="h2">
									{ tshirt.name }
								</Typography>

								<Typography component="p">
									Price: { tshirt.price }  
									Discounted Price: { tshirt.discounted_price }
								</Typography>
							</CardContent>

							<CardActions style= {{ backgroundColor: 'currentColor' }}>
								
								<TshirtDetail tshirt={tshirt}/>

								{ 
									addedToCart? 
										<IconButton color="inherit" onClick = { () => { this.removeFromCart(tshirt._id)}}>
									            <img src="https://img.icons8.com/color/40/000000/clear-shopping-cart.png"/>
									    </IconButton>

									:
										<IconButton color="inherit" onClick = { () => { this.addItemToCart(tshirt)}}>
									            <img src="https://img.icons8.com/color/40/000000/add-shopping-cart.png"/>
									    </IconButton>
									

								}
								
							</CardActions>

						</Card>

					): null}
				</div>
			)
	}


}

Tshirt.propTypes = {
    tshirt: PropTypes.object.isRequired,
    incrementItemCount: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
})


export default connect(mapStateToProps,{ incrementItemCount, addToCart, removeFromCart })(Tshirt);

