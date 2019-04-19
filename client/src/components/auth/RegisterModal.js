import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    password: '',
    address: '',
    photo: '',
    msg: null
  };

  //proptypes
  static propTypes = {
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;

    if(error !==  prevProps.error){
      //check for register error
      if(error.id === 'REGISTER_FAIL'){
          this.setState({ msg: error.msg.msg });
      }else{
        this.setState({ msg: null });
      }
    }

    //if authenticate then close modal.
    if(this.state.open){
      if(isAuthenticated) this.handleClose();
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

  onSubmit = e => {

    e.preventDefault();


    const { name, email, password, address, photo } = this.state;

    //create user object
    const newUser = {
      name,
      email,
      password,
      address,
      photo
    };

    

    //attempt to register new user.
    this.props.register(newUser);
  }

  render() {
    return (
      <Fragment>
       
        <Button color="inherit" onClick={this.handleClickOpen}>
            Register
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          
          aria-labelledby="form-dialog-title"
        >
          
          <DialogTitle id="form-dialog-title">Register</DialogTitle>
          <DialogContent>
          { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: 
            <DialogContentText>
            
              Please fillup the form below and submit to register. Thank you.'
            
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
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />

            <TextField
              margin="dense"
              id="password"
              label="password"
              type="password"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />

            <TextField
              margin="dense"
              id="address"
              label="address"
              type="text"
              fullWidth
              onChange={ (event) => this.onHandleChange(event)}
            />
            

            
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={this.onSubmit}>
              Register
            </Button>
          </DialogActions>
          
          
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
})

export default connect(

  mapStateToProps,

  { register, clearErrors }


)(RegisterModal)
