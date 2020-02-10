import {put} from 'redux-saga/effects'; // put - dispatch a new action

import * as actionTypes from '../actions/actionTypes';

function* logout(action) { // function* - generator
  yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put({
		type: actionTypes.AUTH_LOGOUT
	})
}