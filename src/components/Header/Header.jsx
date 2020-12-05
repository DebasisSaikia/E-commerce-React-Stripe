import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

//custom css
import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2037/2037660.svg"
              alt="Tech Store"
              height="25px"
              className={classes.image}
            />
            TechStore
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Cart item" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
