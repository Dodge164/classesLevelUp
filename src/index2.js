const updateState = (state, action) => {
  if (action.type === 'PLUS') {
    return {
      ...state,
      count: state.count + action.amount,
    };
  } else if (action.type === 'MINUS') {
    return {
      ...state,
      count: state.count - action.amount,
    };
  } else {
    return state;
  }
};

class Store {
  constructor(updateState, state) {
    this._updateState = updateState;
    this._state = state;
    this._callbacks = [];
  }

  getState = () => this._state;

  dispatch = (action) => {
    this._state = this._updateState(this._state, action);
    this._callbacks.forEach((cb) => cb());
  };

  subscribe = (callback) => {
    this._callbacks.push(callback);
  };
}

const initState = {
  // == state == { count: 0, name: 'Al' }
  count: 0,
  name: 'Al',
};

const store = new Store(updateState, initState);
const { dispatch } = store;

const bindActionCreator =
  (creator, dispatch) =>
  (...args) => {
    dispatch(creator(...args));
  };

const plusAction = (amount) => ({ type: 'PLUS', amount });
const minusAction = (amount) => ({ type: 'MINUS', amount });

const plus = bindActionCreator(plusAction, dispatch);
const minus = bindActionCreator(minusAction, dispatch);

plus(7);
minus(2);
plus(10);
minus(6);

// dispatch({});
