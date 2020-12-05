import React from "react";
import { Grid } from "@material-ui/core";
import Item from "./Item/Item";

import useStyles from "./styles";

const items = [
  {
    id: 1,
    name: "Shoes",
    description: "Running Shoes",
    price: "Rs 340",
    image:
      "https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: 2,
    name: "Macbook",
    description: "Apple macbook",
    price: "Rs 340",
    image:
      "https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];


const Items = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} md={4} sm={6} lg={3}>
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Items;
