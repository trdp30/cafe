// CafeMenu.js

import React, { useState } from "react";
import Cart from "./Cart";
import { menuItems } from "./menuItems";

const CafeMenu = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].count += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, count: 1 }]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.name === itemToRemove.name);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      if (updatedCart[existingItemIndex].count === 1) {
        // If there's only one item, remove it completely
        updatedCart.splice(existingItemIndex, 1);
      } else {
        // Decrease the quantity by one
        updatedCart[existingItemIndex].count -= 1;
      }
      setCart(updatedCart);
    }
  };

  return (
    <div>
      <img src="/images/banner.jpeg" alt="banner" className="banner" />
      <div className="cafe-menu">
        {menuItems.map((category, index) => (
          <div key={index} className="menu-category">
            <h2 className="category-title">{category.category}</h2>
            <ul className="menu-list">
              {category.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="menu-item"
                  onClick={() => item.price && addToCart(item)}>
                  <span className="item-name">{item.name}</span>
                  {item.price && <span className="item-price">₹{item.price.toFixed(2)}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Cart cart={cart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default CafeMenu;
