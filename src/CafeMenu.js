// CafeMenu.js

import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { menuItems } from "./menuItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CafeMenu = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to track cart visibility

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (cart.length < 1) {
      setIsCartOpen(false);
    }
  }, [cart]);

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
      <div className="menu-header">
        {cart.length > 0 && (
          <div className="cart-icon" onClick={toggleCart}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{cart.length}</span>
          </div>
        )}
      </div>

      <div className="cafe-menu">
        {isCartOpen && <Cart cart={cart} removeFromCart={removeFromCart} />}
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
      </div>
    </div>
  );
};

export default CafeMenu;
