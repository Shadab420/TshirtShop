import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';




const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 5,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },

  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(id, desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { id, desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}


function CartTable(props) {
  const { classes, cartItems } = props;
  const invoiceSubtotal = subtotal(cartItems);
  const vat = 0.1;
  const invoiceTotal = invoiceSubtotal + (invoiceSubtotal*vat);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Name</strong></TableCell>
            <TableCell align="center">Image</TableCell>
            {/*<TableCell align="right">Qty.</TableCell>
            <TableCell align="right">@</TableCell>*/}
            <TableCell align="center">Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map(item => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center"><Avatar alt="Remy Sharp" src={ item.image1 } className={classes.bigAvatar} /></TableCell>
              {/*<TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell> */}
              <TableCell align="center">{ccyFormat(item.price)}</TableCell>
              <TableCell alight="center">
                  <IconButton color="inherit" onClick={ () => { props.removeFromCart(item._id) }}>
                    <img src="https://img.icons8.com/color/30/000000/trash.png"/>
                  </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell>{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>VAT</TableCell>
            <TableCell align="right">{`${(vat * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(vat)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

CartTable.propTypes = {
  classes: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
})

export default connect(mapStateToProps,{ removeFromCart })(withStyles(styles)(CartTable));
