import React, { useEffect } from 'react'
import AllPost from './AllPost'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
    }
    else {
      history("/login")
    }
  }, [])

  return (<>
    <div className='d-flex align-items-start'><AllPost /></div>
  </>
  )
}

export default Home