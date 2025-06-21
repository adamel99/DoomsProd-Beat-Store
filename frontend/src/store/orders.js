import { csrfFetch } from "./csrf";

// Action Types
const GET_USER_ORDERS = "orders/getUserOrders";
const CREATE_ORDER = "orders/createOrder";
const DELETE_ORDER = "orders/deleteOrder";

// Action Creators
const getUserOrders = (orders) => ({
  type: GET_USER_ORDERS,
  payload: orders,
});

const createOrder = (order) => ({
  type: CREATE_ORDER,
  payload: order,
});

const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  payload: orderId,
});

// Thunks

export const getUserOrdersThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders`);
    const data = await res.json();
    dispatch(getUserOrders(data.orders));
    return data.orders;
  } catch (err) {
    console.error("Error fetching orders:", err);
    return err;
  }
};

export const createOrderThunk = (orderData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      const newOrder = await res.json();
      dispatch(createOrder(newOrder));
      return newOrder;
    }
  } catch (err) {
    console.error("Error creating order:", err);
    return err;
  }
};

export const deleteOrderThunk = (orderId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteOrder(orderId));
      return "Order deleted successfully";
    }
  } catch (err) {
    console.error("Error deleting order:", err);
    return err;
  }
};

// Reducer
const initialState = {
  userOrders: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS: {
      const ordersMap = {};
      action.payload.forEach((order) => {
        ordersMap[order.id] = order;
      });
      return { ...state, userOrders: ordersMap };
    }

    case CREATE_ORDER: {
      return {
        ...state,
        userOrders: {
          ...state.userOrders,
          [action.payload.id]: action.payload,
        },
      };
    }

    case DELETE_ORDER: {
      const newState = { ...state, userOrders: { ...state.userOrders } };
      delete newState.userOrders[action.payload];
      return newState;
    }

    default:
      return state;
  }
};

export default ordersReducer;
