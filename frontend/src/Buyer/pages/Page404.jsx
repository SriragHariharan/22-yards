import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className="text-center">
        <img src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif" alt="404 error image" />
        <h4 className='text-center' style={{marginTop:'-8rem'}} >OOPS... You are lost somewhere...! <br /> <br /> Go back to <Link to={'/'}>Homepage</Link></h4>
    </div>
  )
}
