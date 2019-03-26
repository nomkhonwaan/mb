/**
 * External Dependencies
 */
import { ofType } from 'redux-observable';
import update from 'immutability-helper';
import { map, mergeMap } from 'rxjs/operators';

const FETCH_LATEST_PUBLISHED_POSTS = 'FETCH_LATEST_PUBLISHED_POSTS';
const FETCH_LATEST_PUBLISHED_POSTS_FULFILLED = 'FETCH_LATEST_PUBLISHED_POSTS_FULFILLED';

/**
 * List of GraphQL's fragments
 */
const fragments = {
  post: `
    fragment post on Post {
      id
      title
      slug
      status
      markdown
      html
      author {
        avatarUrl
        displayName
      }
      categories {
        name
        slug
      }
      publishedAt
      createdAt
      updatedAt
    }
  `,
};

export function fetchLatestPublishedPosts(offset = 0, limit = 5) {
  return {
    type: FETCH_LATEST_PUBLISHED_POSTS,
    offset,
    limit,
  };
}

export function fetchLatestPublishedPostsFulfilled(posts) {
  return {
    type: FETCH_LATEST_PUBLISHED_POSTS_FULFILLED,
    posts,
  };
}

export function fetchLatestPublishedPostsEpic(action$, state$, dependencies) {
  const { apiClient } = dependencies;
  const query = `
    query FetchLatestPublishedPostsQuery($offset: Int, $limit: Int) {
      latestPublishedPosts(offset: $offset, limit: $limit) {
        ...post
      }
    }

    ${fragments.post}
  `;

  return action$.pipe(
    ofType(FETCH_LATEST_PUBLISHED_POSTS),
    mergeMap(({ offset, limit }) =>
      apiClient
        .do(query, { offset, limit })
        .pipe(
          map(({ response: { data: { latestPublishedPosts } } }) =>
            fetchLatestPublishedPostsFulfilled(latestPublishedPosts),
          ),
        ),
    ),
  );
}

const initialState = {
  latestPublishedPosts: [],
};

function recentPosts(state = initialState, action) {
  switch (action.type) {
    case FETCH_LATEST_PUBLISHED_POSTS_FULFILLED:
      return update(state, {
        latestPublishedPosts: { $set: action.posts },
      });
    default: 
      return state;
  }
}

export default recentPosts;
