import { LOG_IN, SIGN_UP } from '../actions/auth';

export const initialState = {
  token : null,
  userId : null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN:
      return {
        token: action.token,
        userId: action.userId
      };
      case SIGN_UP:
        return {
          token: action.token,
          userId: action.userId
        };
      default:
        return state;
  }
}; 