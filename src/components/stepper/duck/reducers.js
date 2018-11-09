import types from './types';
import _ from 'lodash';

const initialState = {
  data: [],
  scenes: [],
  current: 0,
  prev: null,
  options: {}
};
export const stepperReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_STEPPER_DATA:
      return {
        ...state,
        data: payload.data
      };
    case types.SET_STEPPER_RAW:
      return {
        ...state,
        raw: _.get(payload, 'data.data', []),
        scenes: _.get(payload, 'data.metadata.scenes', []),
        meta: _.get(payload, 'data.metadata', [])
      };
    case types.SET_STEPPER_CURRENT:
      return {
        ...state,
        prev: state.current,
        current:
          payload.current < 0 || payload.current > state.scenes.length - 1
            ? 0
            : payload.current
      };
    case types.SET_STEPPER_OPTIONS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
