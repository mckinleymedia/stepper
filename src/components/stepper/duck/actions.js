import types from './types';

const setStepperData = data => ({
  type: types.SET_STEPPER_DATA,
  payload: {
    data: data
  }
});
const setStepperRaw = data => ({
  type: types.SET_STEPPER_RAW,
  payload: data
});
const setStepperCurrent = current => ({
  type: types.SET_STEPPER_CURRENT,
  payload: {
    current: current
  }
});

const setStepperOptions = options => ({
  type: types.SET_STEPPER_OPTIONS,
  payload: {
    options: options
  }
});

export default {
  setStepperData,
  setStepperRaw,
  setStepperCurrent,
  setStepperOptions
};
