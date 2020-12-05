import React, { useState, useEffect } from "react";
import "./App.css";
import { commerce } from "./data/commerce";

import { Header, Items } from "./components";

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
      <Header cartItems={cart.total_items} />
      <Items items={products} populateCart={handleCart} />
    </>
  );
}

export default App;
