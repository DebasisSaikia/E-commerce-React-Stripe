import React from "react";
import Grid from "@material-ui/core";
import Item from "./Item/Item";

const items = [
  { id: 1, name: "Shoes", description: "Running Shoes",price:'Rs 340' },
  { id: 2, name: "Macbook", description: "Apple macbook",price:'Rs 340' },
];

const Items = () => {
  return (
    <main>
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
