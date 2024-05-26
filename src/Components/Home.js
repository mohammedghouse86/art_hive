import React from 'react'
import AllPost from './AllPost'
import User_loggedIn from './user_loggedIn'

const Home = () => {

  return (<>
    <div className='d-flex align-items-start'>
      <AllPost /></div>
    <div className='d-flex align-items-end  fixed-bottom'><User_loggedIn /></div>
    
  </>
  )
}

export default Home