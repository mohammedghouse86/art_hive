import React, {useState} from 'react'

const About = () => {
const [yo,setYo] = useState("")
const fun_change = () =>{
  setYo("ART HIVE")
}
  return (
    <div>
      This is About {yo} <button onClick={fun_change}></button>
    </div>
  )
}

export default About
