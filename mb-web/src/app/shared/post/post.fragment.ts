import gql from 'graphql-tag';

export default gql`
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
`
