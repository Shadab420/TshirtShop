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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';

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

class TshirtDetail extends React.Component {
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
    const { classes, tshirt } = this.props;

    return (
      <div>
        
        <Button size="small" color="primary" onClick={this.handleClickOpen} target="_blank" >
              Detail
        </Button>

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
                  Details
              </Typography>
              <IconButton color="inherit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"/></svg>
              </IconButton>
            </Toolbar>
          </AppBar>


          <Grid container spacing = {24} style={{ padding: 24 }}>
                    
                        <Grid item xs={12} sm={6} lg={6} xl={6}>
                            <Card>
                                <CardMedia style={{ height: 0, paddingTop: '56.25%', backgroundSize: 'contain', backgroundColor: 'burlywood'}}
                                  image = { tshirt.image1 }
                                  name = { tshirt.name }
                                />

                                <CardActions style= {{ backgroundColor: 'currentColor' }}>
                                  
                                  <Grid container justify="center" alignItems="center">
                                    <Avatar alt="Remy Sharp" src={tshirt.image1} className={classes.bigAvatar} />
                                    <Avatar alt="Remy Sharp" src={tshirt.image1} className={classes.avatar} />
                                  </Grid>

                                  
                                </CardActions>

                              </Card>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6} xl={6}>
                            <List>
                              <ListItem>
                                <ListItemText primary="Brand" secondary={tshirt.name} />
                              </ListItem>
                              <Divider />
                              <ListItem>
                                <ListItemText primary="Description" secondary={tshirt.description} />
                              </ListItem>
                              <Divider />
                              <ListItem>
                                <ListItemText primary="Price" secondary={tshirt.price} />
                              </ListItem>
                              <Divider />
                              <ListItem>
                                <ListItemText primary="Discounted Price" secondary={tshirt.discounted_price} />
                              </ListItem>
                            </List>
                        </Grid>
                    
                </Grid> 
          
        </Dialog>
      </div>
    );
  }
}

TshirtDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TshirtDetail);