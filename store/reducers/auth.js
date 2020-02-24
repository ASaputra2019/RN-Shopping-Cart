import { AUTHENTICATE, LOG_OUT } from '../actions/auth';

export const initialState = {
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
}; 