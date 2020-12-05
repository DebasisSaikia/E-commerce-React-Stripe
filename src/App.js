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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <Header />
      <Items items={products} />
    </>
  );
}

export default App;
