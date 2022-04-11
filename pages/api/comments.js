// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Any file inside the folder pages/api is mapped to /api/* and
// will be treated as an API endpoint instead of a page.

import { GraphQLClient, gql } from 'graphql-request'

const grapqlAPI = process.env.NEXT_PUBLIC_GRAPHQLCMS_ENDPOINT
const graphqlCMSToken = process.env.NEXT_PUBLIC_GRAPHQLCMS_TOKEN
// post comments route
export default async function comments(req, res) {
  // const { name, email, slug, comment} = req.body
  // initiate graphql
  const graphqlClient = new GraphQLClient(grapqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlCMSToken}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  try {
    const results = await graphqlClient.request(query, req.body)

    // state the request is a success
    res.status(200).send(results)
  } catch (error) {
    console.log(error)
    res.status(500).send(results)
  }
}
