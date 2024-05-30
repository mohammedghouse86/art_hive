import React from 'react'

const ChatMember = (post) => {
    //console.log('username =',post.post.name)
  return (
    <div>
      <div className="d-flex justify-content-start mx-2 my-2"> 
      <img src={`${post.post.imageBase64}`} alt={`${post.post.name}`} style={{ width: '45px', height: '50px', borderRadius: '50%', border: '2px solid red' }} />
        <p className="card-text" > {post.post.name} 
        </p>
      </div>
    </div>
  )
}

export default ChatMember
