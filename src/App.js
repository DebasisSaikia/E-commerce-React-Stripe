import React, { useState, useEffect } from "react";
import "./App.css";
import { commerce } from "./data/commerce";
import { Basket, Checkout, Header, Items } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  // cart functionality
  const [cart, setCart] = useState({});

  // final order state
  const [order, setOrder] = useState({});

  // error handling
  const [errorMessage, setErrorMessage] = useState("");

  // rendering data
  const fetchItems = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    // retrieving cart item
    setCart(await commerce.cart.retrieve());
  };

  // adding item to the cart
  const handleCart = async (itemId, quantity) => {
    const response = await commerce.cart.add(itemId, quantity);
    setCart(response.cart);
  };

  // updating  cart quantity:
  const handleCartQty = async (itemId, quantity) => {
    const response = await commerce.cart.update(itemId, { quantity });
    setCart(response.cart);
  };

  // removing from cart
  const removeCart = async (itemId) => {
    const response = await commerce.cart.remove(itemId);
    setCart(response.cart);
  };

  // handle empty cart
  const emptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  // refresh and empty the cart once order is done
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  // check final checkout with stripe
  const handleCheckout = async (checkoutId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchCart();
  }, []);

  console.log(cart);
  return (
    <>
      <Router>
        <Header cartItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Items items={products} populateCart={handleCart} />
          </Route>
          <Route exact path="/cart">
            <Basket
              cart={cart}
              handleCartQty={handleCartQty}
              removeCart={removeCart}
              emptyCart={emptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCheckout={handleCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
