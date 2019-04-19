    import React, { Component } from 'react';
    import { Container, ListGroup, ListGroupItem } from 'reactstrap';
    // import { CSSTransition, TransitionGroup } from 'react-transition-group';
    import Fab from '@material-ui/core/Fab';
    import IconButton from '@material-ui/core/IconButton';
    import { Delete } from '@material-ui/icons';
    import Grid from '@material-ui/core/Grid';
    import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

    import { Paper, Tabs } from '@material-ui/core/Tabs';
    import Tab from '@material-ui/core/Tab';
    import uuid from 'uuid';
    import Tshirt from '../Tshirt';
    import { connect } from 'react-redux';
    import { getItems } from '../../actions/itemActions';
    import PropTypes from 'prop-types';
    import MUIDataTable from "mui-datatables";
    import TshirtDetail from '../TshirtDetail';
    import Avatar from '@material-ui/core/Avatar';
    import AddProductModal from './product/AddProductModal';
    import { deleteProducts } from '../../actions/itemActions';

    const styles = {
      bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
      },
    };

    class Products extends Component{

        componentDidMount(){
            this.props.getItems();
        }

        getMuiTheme = () => createMuiTheme({
            overrides: {
                MuiTableHead: {
                    root: {
                        backgroundColor: "Red"
                    }
                },
                MUIDataTableBodyRow: {
                    root: {
                      backgroundColor: "BEIGE"
                  }
              },

              MuiPaper: {
                root: {
                    backgroundColor: "burlywood"
                }
            }
        }
    })

       

        render(){
            const { classes } = this.props;            
            const { tshirts } = this.props.item;
            const options = {
              filterType: 'checkbox',
              onRowClick: (row,index) => {
                    
                    
                    
                },

                onRowsDelete: (rowsDeleted) => {
                    this.props.deleteProducts(tshirts,rowsDeleted.data);
                }

          };

          // const columns = ["name", "price", "discounted_price"];

            const columns = [
                 {
                  name: "name",
                  label: "Name",
                  options: {
                   filter: true,
                   sort: true,
                  }
                 },
                 {
                  name: "image1",
                  label: "Image",
                  options: {
                   filter: false,
                   sort: false,
                   customBodyRender: (value, tableMeta, updateValue) => {

                        return (
                            <Avatar alt="Remy Sharp" src={value} className={classes.bigAvatar} />
                        )
                        
                   }
                  }
                 },
                 {
                  name: "price",
                  label: "Price",
                  options: {
                   filter: true,
                   sort: false,
                  }
                 },
                 {
                  name: "discounted_price",
                  label: "Discounted Price",
                  options: {
                   filter: true,
                   sort: false,
                  }
                 },

                 {
                  name: "actions",
                  label: "Actions",
                  options: {
                   filter: false,
                   sort: false,
                   customBodyRender: (value, tableMeta, updateValue) => {

                        return (
                            <TshirtDetail tshirt={tshirts[tableMeta.rowIndex]}/>
                        )
                        
                   }
                  }
                 },
                 
            ];

            return (
                <Container>

                <React.Fragment>
                  <AddProductModal/>
                </React.Fragment>

                <MuiThemeProvider theme={this.getMuiTheme()}>

                

                <MUIDataTable
                    title={"Products List"}
                    data={tshirts}
                    columns={columns}
                    options={options}
                    
                />

                </MuiThemeProvider>                   

                </Container>
                );
        }

    }

    Products.propTypes = {
        classes: PropTypes.object.isRequired,
        getItems: PropTypes.func.isRequired,
        deleteProducts: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => ({
        item: state.item
    })

    export default connect(mapStateToProps, { getItems, deleteProducts }) (withStyles(styles)(Products));