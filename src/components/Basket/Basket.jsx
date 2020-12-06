import React from "react";
import { Typography, Grid, Container, Button } from "@material-ui/core";
import useStyles from "./styles";
import BasketItem from "./BasketItem/BasketItem";
import { Link } from "react-router-dom";

const Basket = ({ cart }) => {
  const isEmpty = !cart.line_items?.length;

  //   custom styles
  const classes = useStyles();

  //   cart functionality
  const EmptyBasket = () => {
    return (
      <Typography variant="subtitle1">
        Your Shopping cart is Empty. Add Some item to buy.
        <Link to="/" className={classes.link}>
          Continue shopping
        </Link>
      </Typography>
    );
  };

  //   filled cart:
  const ItemBasket = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map((product) => (
            <Grid item xs={12} sm={4} key={product.id}>
              <BasketItem product={product} />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cartDetails}>
          <Typography variant="h4">
            Subtotal:{cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Empty Basket
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Container>
        <div className={classes.toolbar} />
        <Typography variant="h3" className={classes.title} gutterBottom>
          Your Shopping cart
        </Typography>
        {isEmpty ? <EmptyBasket /> : <ItemBasket />}
      </Container>
    </>
  );
};

export default Basket;
