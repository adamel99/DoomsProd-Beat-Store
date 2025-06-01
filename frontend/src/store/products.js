// ProductsReducer.js
import { csrfFetch } from "./csrf";
import { thunk } from 'react-redux'

const GET_ALL_PRODUCTS = "products/getAllProducts";
const CREATE_PRODUCT = "products/createProduct";
const GET_SINGLE_PRODUCT = "products/getSingleProduct";
const DELETE_PRODUCT = "products/deleteProduct";

const getAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  payload: products,
});

const getSingleProduct = (product) => ({
  type: GET_SINGLE_PRODUCT,
  payload: product,
});

const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  payload: product,
});

const deleteProduct = (productToDelete) => ({
  type: DELETE_PRODUCT,
  payload: productToDelete,
});

export const getAllProductsThunk = () => {
  return async (dispatch, getState) => {
    try {
      const res = await csrfFetch("/api/products");
      const data = await res.json();
      console.log("data", data);

      dispatch(getAllProducts(data));
      console.log("allProducts in state:", getState().products.allProducts);
      return data.products;
    } catch (err) {
      console.error(err);
      return err;
    }
  };
};


// export const ViewAllGroupsThunk = () => {
//   return async (dispatch) => {
//       try {
//           const res = await csrfFetch("/api/groups");
//           const data = await res.json();
//           console.log("data", data);

//           dispatch(GetAllGroups(data.Groups));
//           return data.Groups;
//       } catch (error) {
//       }
//   };
// };

export const getSingleProductThunk = (productId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/${productId}`);

    if (res.ok) {
      const product = await res.json();
      dispatch(getSingleProduct(product));
      return product;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const createProductThunk = (product) => async (dispatch) => {
  try {
    const res = await csrfFetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
    });

    if (res.ok) {
      const newProduct = await res.json();
      dispatch(createProduct(newProduct));
      return newProduct;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const deleteProductThunk = (productToDelete) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/${productToDelete.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const message = await res.json();
      dispatch(deleteProduct(productToDelete));
      console.log(message);
      return message;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

const initialState = { allProducts: {}, singleProduct: {} };

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      const productsById = {};
      action.payload.forEach(product => {
        productsById[product.id] = product;
      });
      return {
        ...state,
        allProducts: productsById,
      };

    case GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
      case CREATE_PRODUCT:
        return {
          ...state,
          allProducts: {
            ...state.allProducts,
            [action.payload.id]: action.payload,
          },
        };
        case DELETE_PRODUCT:
          const updatedProducts = { ...state.allProducts };
          delete updatedProducts[action.payload.id];
          return {
            ...state,
            allProducts: updatedProducts,
            singleProduct: {},
          };
    default:
      return state;
  }
};

export default productsReducer;
