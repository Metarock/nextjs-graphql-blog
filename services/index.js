import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQLCMS_ENDPOINT

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

const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        content {
          raw
        }
      }
    }
  `

  // first params: URL, second params: QUERY / requested graphql query, third params: is the variable
  const result = await request(graphqlAPI, query, { slug })

  return result.post
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

const getSimilarPosts = async (categories, slug) => {
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

  const result = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.categories
}

const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.comments
}

// POST to
const submitComment = async (obj) => {
  // use nextjs own backend from the folder "api" as the root folder
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug, createdAt })

  return { next: result.next[0], previous: result.previous[0] }
}

const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
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
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.postsConnection.edges
}

export {
  getPosts,
  getRecentPosts,
  getSimilarPosts,
  getCategories,
  getPostDetails,
  submitComment,
  getComments,
  getFeaturedPosts,
  getAdjacentPosts,
  getCategoryPost,
}
