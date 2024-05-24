import React from 'react'

const CommentItem = ({ post }) => {
  return (
    <>
      <div className='container'>{post.comment}</div>
    </>
  )
}

export default CommentItem
