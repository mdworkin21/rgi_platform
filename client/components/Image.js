import React from 'react'
import '../public/styles/image.css'


const Image = (props) => {
  const {imgSrc} = props
  return (
       <img className='image' src={imgSrc}></img>
  )
}

export default Image