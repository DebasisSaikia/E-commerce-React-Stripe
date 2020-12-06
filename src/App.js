import React, { useState, useEffect } from "react";
import "./App.css";
import { commerce } from "./data/commerce";
import { Basket, Header, Items } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  // cart functionality
  const [cart, setCart] = useState({});

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
    const itemOne = await commerce.cart.add(itemId, quantity);
    setCart(itemOne.cart);
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
            <Basket cart={cart} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
