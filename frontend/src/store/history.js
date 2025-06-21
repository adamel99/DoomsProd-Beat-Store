import { csrfFetch } from "./csrf";

// Action Types
const GET_USER_HISTORY = "history/getUserHistory";
const ADD_HISTORY_ENTRY = "history/addHistoryEntry";
const DELETE_HISTORY_ENTRY = "history/deleteHistoryEntry";

// Action Creators
const getUserHistory = (historyEntries) => ({
  type: GET_USER_HISTORY,
  payload: historyEntries,
});

const addHistoryEntry = (entry) => ({
  type: ADD_HISTORY_ENTRY,
  payload: entry,
});

const deleteHistoryEntry = (entryId) => ({
  type: DELETE_HISTORY_ENTRY,
  payload: entryId,
});

// Thunks

// Get full history for a user
export const getUserHistoryThunk = (userId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/history`);
    const data = await res.json();
    dispatch(getUserHistory(data.history));
    return data.history;
  } catch (err) {
    console.error("Error fetching history:", err);
    return err;
  }
};

// Add a history record (e.g., when user listens or downloads a beat)
export const addHistoryEntryThunk = (userId, entryData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/users/${userId}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entryData),
    });

    if (res.ok) {
      const newEntry = await res.json();
      dispatch(addHistoryEntry(newEntry));
      return newEntry;
    }
  } catch (err) {
    console.error("Error adding history entry:", err);
    return err;
  }
};

// Delete a history record (optional)
export const deleteHistoryEntryThunk = (entryId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/history/${entryId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteHistoryEntry(entryId));
      return "Deleted successfully";
    }
  } catch (err) {
    console.error("Error deleting history entry:", err);
    return err;
  }
};

// Reducer
const initialState = {
  userHistory: {},
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_HISTORY: {
      const historyMap = {};
      action.payload.forEach((entry) => {
        historyMap[entry.id] = entry;
      });
      return { ...state, userHistory: historyMap };
    }

    case ADD_HISTORY_ENTRY: {
      return {
        ...state,
        userHistory: {
          ...state.userHistory,
          [action.payload.id]: action.payload,
        },
      };
    }

    case DELETE_HISTORY_ENTRY: {
      const updatedHistory = { ...state.userHistory };
      delete updatedHistory[action.payload];
      return { ...state, userHistory: updatedHistory };
    }

    default:
      return state;
  }
};

export default historyReducer;
