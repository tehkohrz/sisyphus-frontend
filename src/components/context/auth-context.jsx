import { createContext, useEffect, useReducer } from 'react';
import { authApi } from '../../auth_functions/auth_api';

const ActionType = {
  INITIALIZE: 'INITIALIZE',
  SIGNIN: 'SIGNIN',
  LOGOUT: 'LOGOUT',
  REAUTH: 'REAUTH',
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: {
    username: '',
    user_id: null,
  },
};

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

  REAUTH: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  SIGNIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    // user: null,
  }),
  // Adopt for registration
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: false,
      user,
    };
  },
};

const reducer = (state, action) =>
  // if the action.type exist -> if so call the method and pass the state/action
  handlers[action.type] ? handlers[action.type](state, action) : state;

// Sets the type and intial/default value
export const AuthContext = createContext({
  ...initialState,
  signIn: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reAuth: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Cookie is set here and responded here
        //! Authorisation API Insert
        let { success, user } = await authApi.reAuth();

        if (success) {
          // The object passed into dispatch is action -> action.type calls the method
          // Action is used and passed into the reducer -> action.payload destructed in the method
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (username, password) => {
    try {
      const user = await authApi.signIn({ username, password });

      dispatch({
        type: ActionType.SIGNIN,
        payload: {
          user: user.data,
          isAuthenticated: true,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const reAuth = async () => {
    try {
      const { success, user } = await authApi.reAuth();
      if (success) {
        dispatch({
          type: ActionType.REAUTH,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: ActionType.REAUTH,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: ActionType.REAUTH,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  const logout = async () => {
    await authApi.logout();
    dispatch({
      type: ActionType.LOGOUT,
    });
  };

  // kinda shows how to use the context and format\
  // the children are the components that the context provider is wrapping
  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        logout,
        reAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
