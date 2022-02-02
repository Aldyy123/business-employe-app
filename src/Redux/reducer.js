import React, {createContext} from 'react';

const UserContext = createContext();
const initialState = {
  sessionLogin: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      state.sessionLogin = action.user;
      break;
    default:
      break;
  }
};

export {initialState, reducer, UserContext};
