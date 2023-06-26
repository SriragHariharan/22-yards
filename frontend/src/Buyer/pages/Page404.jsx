import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
  return (
    <div className="text-center mt-5">
        <img width='380' src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif" alt="404 error image" />
        <h6 className='text-center'>OOPS... You are lost somewhere...! <br /> <br /> Go back to <Link to={'/'}>Homepage</Link></h6>
    </div>
  )
}
