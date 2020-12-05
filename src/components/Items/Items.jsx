import React from "react";
import { Grid } from "@material-ui/core";
import Item from "./Item/Item";

import useStyles from "./styles";

const Items = ({ items }) => {
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
