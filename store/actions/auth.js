import { AsyncStorage } from 'react-native';

import serverKey from '../../key/key';


export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';
let timer;

export const authenticate = (userId, token, expirationTime) => {
  return (dispatch) => {

    dispatch(setLogoutTimer(expirationTime));
    dispatch({
      type: AUTHENTICATE,
      token,
      userId
    });
  };
}

export const signUp = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${serverKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });
    if (!response.ok) {
      const resErrorData = await response.json();
      let errorMessage;
      if (resErrorData.error.message === 'EMAIL_EXISTS') {
        errorMessage = 'This email address exists already';
      } else if (resErrorData.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        errorMessage = 'You tried too many times, we have blocked this device. Try again sometimes.';
      }
      throw new Error(errorMessage);
    }
    const resData = await response.json();
    // dispatch({
    //   type: SIGN_UP,
    //   token: resData.idToken,
    //   userId: resData.localId
    // });
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveUserDataToStorage(resData.idToken, resData.localId, expirationDate);
  }
};

export const logIn = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${serverKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });
    if (!response.ok) {
      const resErrorData = await response.json();
      let errorMessage;
      if (resErrorData.error.message === 'EMAIL_NOT_FOUND') {
        errorMessage = 'This email could not be found';
      } else if (resErrorData.error.message === 'INVALID_PASSWORD') {
        errorMessage = 'Wrong password';
      }
      throw new Error(errorMessage);
    }
    const resData = await response.json();
    // dispatch({
    //   type: LOG_IN,
    //   token: resData.idToken,
    //   userId: resData.localId
    // });
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveUserDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logOut = () => {
  clearLougoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOG_OUT };
};

const clearLougoutTimer = () => {
  if(timer) clearTimeout(timer);
};

const setLogoutTimer = expirationTime => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  }
}

const saveUserDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token,
    userId,
    expireDate: expirationDate.toISOString()
  }));
};