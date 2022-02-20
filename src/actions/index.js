import {
  ADD_USER,
  FETCH_CARD_LIST,
  FETCH_CARD_LIST_REJECT,
  FETCH_CARD_LIST_RESOLVE,
  MINUS,
  PLUS,
} from './actionTypes';

export const plusAction = (amount) => {
  return {
    type: PLUS,
    payload: amount,
  };
};
export const minusAction = (amount) => {
  return {
    type: MINUS,
    payload: amount,
  };
};

export const addUserAction = (user) => ({
  type: ADD_USER,
  user,
});

export const cardListAction = () => ({
  type: FETCH_CARD_LIST,
});

export const cardListResolveAction = (payload) => ({
  type: FETCH_CARD_LIST_RESOLVE,
  payload,
});

export const cardListRejectAction = (err) => ({
  type: FETCH_CARD_LIST_REJECT,
  err,
});
