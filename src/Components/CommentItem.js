import React, { useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';


const CommentItem = ({ post }) => {

  useEffect(() => {
    //console.log(post,post.user.name)
  }, [])


  //console.log('this is the user is you are looking for=', post.user)
  return (
    <>
      <p className="card mx-1">
        <div className="text-start my-1" style={{ marginLeft: "10px" }}>{post.user.name} - {post.comment} - {formatDistanceToNow(new Date(post.date))} ago</div></p>
    </>
  )
}

export default CommentItem
