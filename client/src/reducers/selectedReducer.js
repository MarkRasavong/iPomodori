import { NOT_SELECTED, SELECTED } from '../actions/types';

const INTIAL_STATE = {
  selected: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case NOT_SELECTED:
      return { ...state, selected: false };
    case SELECTED:
      return { ...state, selected: true };
    default:
      return state;
  }
};