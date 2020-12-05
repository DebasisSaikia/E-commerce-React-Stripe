import React from "react";
import {
  Typography,
  Button,
  CardActions,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

// custom css
import useStyles from "./styles";

const BasketItem = ({ product }) => {
  const classes = useStyles();
  return (
    <>
      <Card>
        <CardMedia
          image={product.media.source}
          alt={product.name}
          className={classes.media}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h5">
            {product.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions className={classes.cartActions}>
          <div className={classes.buttons}>
            <Button type="button" size="small">
              -
            </Button>
            <Typography>{product.quantity}</Typography>
            <Button type="button" size="small">
              +
            </Button>
          </div>
          <Button variant="contained" type="button" color="secondary">
            Remove
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default BasketItem;
