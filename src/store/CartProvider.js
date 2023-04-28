import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(state, action) {
  if (action.type == "ADD") {
    let updatedItems = state.items.concat(action.item);
    const existing = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existing];

    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existing] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    
    const existing = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existing]
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems
    if (existingItem.amount === 1){
        updatedItems = state.items.filter(item => item.id!== action.id)
    } else{
        const updatedItem = {...existingItem, amount: existingItem.amount -1}
        updatedItems = [...state.items]
        updatedItems[existing] = updatedItem
    }

    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState;
}

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  function addItemToCart(item) {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  }

  function removeItemFromCart(id) {
    dispatchCartAction({
      type: "REMOVE",
      id: id,
    });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
