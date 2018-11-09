import { takeEvery, put, call, select } from 'redux-saga/effects';
import types from './types';
import { chartUtils } from './utils';

function* setStepperCurrentSaga(action) {
  const store = yield select();
  const stepper = store.stepper || 0;
  console.log('setStepperCurrentSaga', store);
  chartUtils.update(stepper.current, stepper.prev, stepper.data, stepper.meta);
}

export function* stepperSagas() {
  yield takeEvery(types.SET_STEPPER_CURRENT, setStepperCurrentSaga);
}
export default stepperSagas;
