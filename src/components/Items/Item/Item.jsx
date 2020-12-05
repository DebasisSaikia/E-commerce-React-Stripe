import classes from "*.module.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import React from "react";

const Item = ({ item }) => {
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image="" title={item.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="h5">{item.price}</Typography>
        </div>
        <Typography variant="h2" color="textSecondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to cart" >
                <AddShoppingCartIcon/>
          </IconButton>
      </CardActions>
    </Card>
  );
};

export default Item;
