/**
 * External Dependencies
 */
import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import update from 'immutability-helper';

const FIND_POST_BY_ID = 'FIND_POST_BY_ID';
const FIND_POST_BY_ID_FULFILLED = 'FIND_POST_BY_ID_FULFILLED';

export function findPostById(id) {
  return {
    type: FIND_POST_BY_ID,
    id,
  };
}

export function findPostByIdFulfilled(post) {
  return {
    type: FIND_POST_BY_ID_FULFILLED,
    post,
  };
}

export function findPostByIdEpic(action$, state$, dependencies) {
  const { apiClient } = dependencies;
  const query = `
  `;

  return action$.pipe(
    ofType(FIND_POST_BY_ID),
    mergeMap(({ id }) =>
      apiClient
        .do(query, { id })
        .pipe(
          map(({ response: { data: { post } } }) =>
            findPostByIdFulfilled(post),
          ),
        ),
    ),
  );
}

const initialState = {};

function single(state = initialState, action) {
  switch (action.type) {
    case FIND_POST_BY_ID_FULFILLED:
      return update(state, {
        $set: action.post,
      });
    default:
      return state;
  }
}

export default single;
