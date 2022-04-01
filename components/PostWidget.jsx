import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentPosts, getSimilarPosts } from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    // if there is a slug
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      )
    } else {
      // not it in a specific category
      getRecentPosts().then((result) => setRelatedPosts(result))
    }
  }, [slug])

  console.log(relatedPosts)

  return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {/* map all of our posts */}
      {relatedPosts.map((post) => (
        <div key={post.title} className="mb-4 flex  w-full items-center">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="rounded-full align-middle"
              src={post.featuredImage.url}
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-xs text-gray-500">
              {moment(post.createdat).format('MMM DD, YYYY')}
            </p>
            <Link
              key={post.title}
              href={`/post/${post.slug}`}
              className="text-md"
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget
