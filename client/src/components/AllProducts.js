import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { Paper, Tabs } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import uuid from 'uuid';
import Tshirt from './Tshirt';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class AllProducts extends Component{

    componentDidMount(){
        this.props.getItems();
    }

    render(){
        const { tshirts } = this.props.item;

        return (
            <Container>
                
                
                <Grid container spacing = {24} style={{ padding: 24, marginTop: '-6.5em' }}>
                    { tshirts.map(currentTshirt => (
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Tshirt tshirt={currentTshirt} />
                        </Grid>
                    ))}
                </Grid>                     
                
            </Container>
        );
    }

}

AllProducts.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems }) (AllProducts);