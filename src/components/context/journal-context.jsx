import { createContext, useReducer } from 'react';
import { journalApi } from '../../api-functions/journal_api';

const ActionType = {
  GET: 'GET',
  POST: 'POST',
  UPDATE: 'UPDATE',
  DATE: 'DATE',
};

const initialState = {
  isInitialized: false,
  read_only: false,
  selectedEntry: {
    entry_date: null,
    content: '',
    title: '',
  },
};

// Handlers for each action type
const handlers = {
  GET: (state, action) => {
    const { selectedEntry } = action.payload;
    return {
      ...state,
      isInitialized: true,
      selectedEntry,
    };
  },
  UPDATE: (state, action) => {
    const { selectedEntry } = action.payload;

    return {
      ...state,
      selectedEntry,
    };
  },
  DATE: (state, action) => {
    const { date } = action.payload;
    const { selectedEntry } = state;
    selectedEntry.entry_date = date;
    return {
      ...state,
      selectedEntry,
    };
  },
};

const reducer = (state, action) =>
  // if the action.type exist -> if so call the method and pass the state/action
  handlers[action.type] ? handlers[action.type](state, action) : state;

// Context to be exported into hook for usage
//  Type definition for the context
export const JournalContext = createContext();

// Context provider to wrap the components
export const JournalProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action of the provider
  const getEntry = async (entryDate) => {
    try {
      const year = entryDate.getUTCFullYear();
      // SQL Months start from 1, UTC starts from 0
      const month = entryDate.getUTCMonth() + 1;
      const date = entryDate.getUTCDate();
      const selectedEntry = await journalApi.getEntry(year, month, date);
      dispatch({
        type: ActionType.GET,
        payload: {
          selectedEntry,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const updateEntry = (selectedEntry) => {
    dispatch({
      type: ActionType.UPDATE,
      payload: {
        selectedEntry,
      },
    });
  };
  const updateDate = (date) => {
    dispatch({
      type: ActionType.DATE,
      payload: {
        date,
      },
    });
  };
  return (
    <JournalContext.Provider
      value={{
        ...state,
        getEntry,
        updateEntry,
        updateDate,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

//! click handlers for the other day-items
