import React, {createContext} from 'react';

const UserContext = createContext();
const initialState = {
  sessionLogin: null,
  settings: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      state.sessionLogin = action.user;
      state.settings = action.settings;
      break;
    default:
      break;
  }
};

export {initialState, reducer, UserContext};
