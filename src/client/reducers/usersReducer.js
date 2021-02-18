import { FETCH_ARTICLES } from '../actions/index';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      console.log('FETCH_ARTICLES', action.payload);
      return action.payload;
    default:
      return state;
  }
};
