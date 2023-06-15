import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

export default function Error({error}) {
    const refreshPage = () => {
        window.location.reload();
    }
  return (
        <Alert variant={'light'} className='text-center p-5 m-5'>
            <img width='15%' src="https://img.freepik.com/premium-vector/white-exclamation-mark-sign-red-circle-isolated-white-background_120819-332.jpg?w=2000" alt="" />
            ,<h3>{error}</h3> 
            <br /> <br />
            <p>Go to <Link onClick={refreshPage}>Homepage</Link> </p>
        </Alert>
  )
}
