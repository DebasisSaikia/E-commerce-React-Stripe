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
import { Link, useLocation } from "react-router-dom";

//custom css
import useStyles from "./styles";

const Header = ({ cartItems }) => {
  const classes = useStyles();
  // displaying cart and home
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2037/2037660.svg"
              alt="Tech Store"
              height="25px"
              className={classes.image}
            />
            TechStore
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Cart item"
                color="inherit"
              >
                <Badge badgeContent={cartItems} color="secondary">
                  <ShoppingBasketIcon />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
