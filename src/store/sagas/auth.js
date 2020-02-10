import {put, delay} from 'redux-saga/effects'; // put - dispatch a new action

import * as actions from '../actions/index';

export function* logoutSaga(action) { // function* - generator
  yield localStorage.removeItem('token');
	yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
};