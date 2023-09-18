// Cart.js

import React from "react";

const Cart = ({ cart, removeFromCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div className="cart">
      <h2>Cart ({cart.length} items)</h2>
      <ul className="cart-list">
        {cart.map((cartItem, cartIndex) => (
          <li key={cartIndex} className="cart-item">
            <span>
              {cartItem.name} (x{cartItem.count})
            </span>
            <span>₹{cartItem.price.toFixed(2) * cartItem.count}</span>
            <button onClick={() => removeFromCart(cartItem)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="total">
        <strong>Total:</strong>
        <span>₹{calculateTotal().toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
