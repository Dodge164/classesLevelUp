import { MINUS, PLUS } from '../actions/actionTypes';

const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case PLUS:
      return {
        ...state,
        count: state.count + action.payload,
      };

    case MINUS:
      return {
        ...state,
        count: state.count - action.payload,
      };

    default:
      return state;
  }
};

export default counterReducer;
