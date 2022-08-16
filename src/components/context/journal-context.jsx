import { createContext, useEffect, useReducer } from 'react';
import { useAuth } from '../hooks/use-auth';

const ActionType = {
  INITIALIZE: 'INITIALIZE',
  POST: 'POST',
  UPDATE: 'UPDATE',
};

const initialState = {
  isInitialized: false,
  user_id: null,
  entries: [],
  read_only: true,
  selected_entry: null,
  selected_content: {
    entry_date: null,
    entry_content: '',
    entry_title: '',
  },
};

// Handlers type
const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
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

  // useEffect to retrieve the entries on load
  useEffect(() => {
    const initialize = async () => {};
  });
};
