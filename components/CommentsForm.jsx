import React, { useState, useEffect, useRef } from 'react'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentEl = useRef()
  const nameEl = useRef()
  const emailEl = useRef()
  const storeDataEl = useRef()

  const handleCommentSubmission = () => {}

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Comment Form</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          placeholder="Comment"
          name="comment"
          className="w-full rounded-lg bg-gray-100  p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type={'text'}
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="w-full rounded-lg bg-gray-100 px-4  py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
        <input
          type={'text'}
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="w-full rounded-lg bg-gray-100 px-4  py-2 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are mandatory</p>
      )}
      <div className="mt-8">
        <button
          type={'button'}
          onClick={handleCommentSubmission}
          className="ease ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
        >
          Post Comment
        </button>
      </div>
    </div>
  )
}

export default CommentsForm
