import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import CartTable  from './CartTable';
import { emptyCart } from '../actions/cartActions';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },

  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Cart extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, cart } = this.props;

    return (
      <div>

        <IconButton color="inherit" onClick={this.handleClickOpen} target="_blank">
                <Badge badgeContent={ cart.itemCnt } color="secondary">
                  <ShoppingCartIcon />
                </Badge>
        </IconButton>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >

          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                  Shopping Cart Details
              </Typography>
              <IconButton color="inherit">
                    <img src="https://img.icons8.com/doodle/50/000000/shopping-bag.png"/>
              </IconButton>
              <IconButton color="inherit" onClick={ () => { this.props.emptyCart() } }>
                    <img src="https://img.icons8.com/color/50/000000/clear-shopping-cart.png"/>
              </IconButton>
            </Toolbar>
          </AppBar> 
              
          <CartTable/>          
          
        </Dialog>
      </div>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  CartTable: PropTypes.func.isRequired,
  emptyCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect( mapStateToProps, { CartTable, emptyCart } ) (withStyles(styles)(Cart));