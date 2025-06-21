import { csrfFetch } from "./csrf";

// Action Types
const GET_PRODUCT_LICENSES = "licenses/getProductLicenses";
const CREATE_LICENSE = "licenses/createLicense";
const DELETE_LICENSE = "licenses/deleteLicense";

// Action Creators
const getProductLicenses = (licenses) => ({
  type: GET_PRODUCT_LICENSES,
  payload: licenses,
});

const createLicense = (license) => ({
  type: CREATE_LICENSE,
  payload: license,
});

const deleteLicense = (licenseId) => ({
  type: DELETE_LICENSE,
  payload: licenseId,
});

// Thunks

// Get all licenses for a product
export const getProductLicensesThunk = (productId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/${productId}/licenses`);
    const data = await res.json();
    dispatch(getProductLicenses(data.licenses));
    return data.licenses;
  } catch (err) {
    console.error("Error fetching licenses:", err);
    return err;
  }
};

// Create a license for a product
export const createLicenseThunk = (productId, licenseData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/products/${productId}/licenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(licenseData),
    });

    if (res.ok) {
      const newLicense = await res.json();
      dispatch(createLicense(newLicense));
      return newLicense;
    }
  } catch (err) {
    console.error("Error creating license:", err);
    return err;
  }
};

// Delete a license
export const deleteLicenseThunk = (licenseId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/licenses/${licenseId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteLicense(licenseId));
      return "License deleted successfully";
    }
  } catch (err) {
    console.error("Error deleting license:", err);
    return err;
  }
};

// Reducer
const initialState = {
  productLicenses: {},
};

const licensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LICENSES: {
      const licensesMap = {};
      action.payload.forEach((license) => {
        licensesMap[license.id] = license;
      });
      return { ...state, productLicenses: licensesMap };
    }

    case CREATE_LICENSE: {
      return {
        ...state,
        productLicenses: {
          ...state.productLicenses,
          [action.payload.id]: action.payload,
        },
      };
    }

    case DELETE_LICENSE: {
      const updatedLicenses = { ...state.productLicenses };
      delete updatedLicenses[action.payload];
      return { ...state, productLicenses: updatedLicenses };
    }

    default:
      return state;
  }
};

export default licensesReducer;
