import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends React.Component {
  state = {
    open: false,
    email: '',
    password: '',
    msg: null
  };

  //proptypes
  static propTypes = {
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;

    if(error !==  prevProps.error){
      //check for register error
      if(error.id === 'LOGIN_FAIL'){
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


    const { email, password } = this.state;

    //create logindata object
    const loginData = {
      
      email,
      password,
    };

    

    //attempt to login user.
    this.props.login(loginData);
  }

  render() {
    return (
     
       
        <Fragment>
          <Button color="inherit" onClick={this.handleClickOpen}>
              Login
          </Button>
        

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
          { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: 
            <DialogContentText>
            
              Welcome!!
            
            </DialogContentText>
          }
            

            <TextField
              autoFocus
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


          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Login
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

  { login, clearErrors }


)(LoginModal)