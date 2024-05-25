import React, { useEffect } from 'react'


const CommentItem = ({ post }) => {

useEffect(()=>{
  //console.log(post,post.user.name)
},[])


  //console.log('this is the user is you are looking for=', post.user)
  return (
    <>
      <div className='container card'>{post.user.name} - {post.comment}</div>
    </>
  )
}

export default CommentItem
