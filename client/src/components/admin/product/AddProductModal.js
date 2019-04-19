import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { addProduct } from '../../../actions/itemActions';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { clearErrors } from '../../../actions/errorActions';
import ProductImageUpload from './ProductImageUpload'

class AddProductModal extends React.Component {
  state = {
    open: false,
    name: '',
    description: '',
    price: '',
    discounted_price: '',
    image1: '',
    display: true,
    msg: null
  };

  //proptypes
  static propTypes = {
    //register: PropTypes.func.isRequired,
    //clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const { error } = this.props;

    if(error !==  prevProps.error){
      //check for register error
      if(error.id === 'ITEM_SAVE_FAIL'){
          this.setState({ msg: error.msg.msg });
      }else{
        this.setState({ msg: null });
      }
    }

    //if authenticate then close modal.
    if(this.state.open){
     // this.handleClose();
    }

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    //clear the errors if any.
    this.props.clearErrors();
    this.setState({ open: false });
  };

  onHandleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleImages = (files) => {
        this.setState({image1: ''});
    }


  onSubmit = e => {

    e.preventDefault();


    const { name, description, price, discounted_price, image1, display } = this.state;

    //create user object
    const newTshirt = {
      name,
      description,
      price,
      discounted_price,
      image1,
      display
    };

    //attempt to add new product.
    this.props.addProduct(newTshirt);
  }

  render() {
    return (
      <Fragment>
       
        <IconButton color="inherit" onClick={this.handleClickOpen}>
            <img src="https://img.icons8.com/color/48/000000/plus.png"/>
        </IconButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          
          aria-labelledby="form-dialog-title"
        >
          
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
          { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: 
            <DialogContentText>
            
              Please fillup the form below and submit to add a product.'
            
            </DialogContentText>
          }
            
            
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />

            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />

            <TextField
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />

            <TextField
              margin="dense"
              id="discounted_price"
              label="Discounted Price"
              type="number"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />
            
            <ProductImageUpload onSelectImage={this.handleImages}/>
            
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.onSubmit}>
              Add Product
            </Button>
          </DialogActions>
          
          
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
})

export default connect(

  mapStateToProps,

  { addProduct, clearErrors }


)(AddProductModal)
