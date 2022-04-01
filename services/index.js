import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHICS_ENDPOINT

const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
          cursor
        }
      }
    }
  `

  //   make a request
  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      # get the posts but order them in an ascending order
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        # what do we want to get from the psots
        title
        featuredImage {
          url 
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($categories: [String!], $slug: String!) {
      posts(
        # dont display the current article, but display other articles that include other categories that we want to get
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        # what do we want to get from the psots
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export { getPosts, getRecentPosts, getSimilarPosts }
