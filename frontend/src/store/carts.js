import { csrfFetch } from "./csrf";

// Action Types
const GET_CART = "cart/getCart";
const ADD_TO_CART = "cart/addToCart";
const REMOVE_FROM_CART = "cart/removeFromCart";
const CLEAR_CART = "cart/clearCart";

// Action Creators
const getCart = (cartItems) => ({
  type: GET_CART,
  payload: cartItems,
});

const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem,
});

const removeFromCart = (cartItemId) => ({
  type: REMOVE_FROM_CART,
  payload: cartItemId,
});

const clearCart = () => ({
  type: CLEAR_CART,
});

// Thunks

// Fetch the cart items for the current user
export const fetchCartThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/carts");
    if (res.ok) {
      const data = await res.json();
      dispatch(getCart(data.cartItems));
      return data.cartItems;
    }
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    return err;
  }
};

// Add a product to the cart
export const addToCartThunk = (productId, quantity = 1) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/carts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (res.ok) {
      const newCartItem = await res.json();
      dispatch(addToCart(newCartItem));
      return newCartItem;
    }
  } catch (err) {
    console.error("Failed to add to cart:", err);
    return err;
  }
};

// Remove a cart item by its ID
export const removeFromCartThunk = (cartItemId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/carts/${cartItemId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(removeFromCart(cartItemId));
      return "Deleted successfully";
    }
  } catch (err) {
    console.error("Failed to remove from cart:", err);
    return err;
  }
};

// Optional: Clear entire cart for the user (if you support it)
export const clearCartThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/carts/clear", {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(clearCart());
      return "Cart cleared";
    }
  } catch (err) {
    console.error("Failed to clear cart:", err);
    return err;
  }
};

// Initial state
const initialState = {
  allItems: {}, // key: cartItemId, value: cart item
};

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART: {
      const itemsMap = {};
      action.payload.forEach((item) => {
        itemsMap[item.id] = item;
      });
      return { ...state, allItems: itemsMap };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        allItems: { ...state.allItems, [action.payload.id]: action.payload },
      };
    }
    case REMOVE_FROM_CART: {
      const updatedItems = { ...state.allItems };
      delete updatedItems[action.payload];
      return { ...state, allItems: updatedItems };
    }
    case CLEAR_CART: {
      return { ...state, allItems: {} };
    }
    default:
      return state;
  }
};

export default cartReducer;
