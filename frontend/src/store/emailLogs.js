import { csrfFetch } from "./csrf";

// Action Types
const GET_ALL_EMAIL_LOGS = "emailLogs/getAllEmailLogs";
const ADD_EMAIL_LOG = "emailLogs/addEmailLog";
const DELETE_EMAIL_LOG = "emailLogs/deleteEmailLog";

// Action Creators
const getAllEmailLogs = (emailLogs) => ({
  type: GET_ALL_EMAIL_LOGS,
  payload: emailLogs,
});

const addEmailLog = (emailLog) => ({
  type: ADD_EMAIL_LOG,
  payload: emailLog,
});

const deleteEmailLog = (logId) => ({
  type: DELETE_EMAIL_LOG,
  payload: logId,
});

// Thunks

export const getAllEmailLogsThunk = () => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/email-logs`);
    if (res.ok) {
      const data = await res.json();
      dispatch(getAllEmailLogs(data.emailLogs));
      return data.emailLogs;
    }
  } catch (err) {
    console.error("Error fetching email logs:", err);
    return err;
  }
};

export const addEmailLogThunk = (logData) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/email-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData),
    });

    if (res.ok) {
      const newLog = await res.json();
      dispatch(addEmailLog(newLog));
      return newLog;
    }
  } catch (err) {
    console.error("Error adding email log:", err);
    return err;
  }
};

export const deleteEmailLogThunk = (logId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/email-logs/${logId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(deleteEmailLog(logId));
      return "Deleted successfully";
    }
  } catch (err) {
    console.error("Error deleting email log:", err);
    return err;
  }
};

// Reducer
const initialState = {
  allEmailLogs: {},
};

const emailLogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMAIL_LOGS: {
      const logsMap = {};
      action.payload.forEach((log) => {
        logsMap[log.id] = log;
      });
      return { ...state, allEmailLogs: logsMap };
    }

    case ADD_EMAIL_LOG: {
      return {
        ...state,
        allEmailLogs: {
          ...state.allEmailLogs,
          [action.payload.id]: action.payload,
        },
      };
    }

    case DELETE_EMAIL_LOG: {
      const updatedLogs = { ...state.allEmailLogs };
      delete updatedLogs[action.payload];
      return { ...state, allEmailLogs: updatedLogs };
    }

    default:
      return state;
  }
};

export default emailLogsReducer;
