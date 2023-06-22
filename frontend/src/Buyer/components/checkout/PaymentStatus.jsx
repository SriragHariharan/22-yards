import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PaymentStatus() {
  const {id} = useParams()
  return (
    <div>
        {
        id &&   (
            <div className="text-center ">
                    <img className='mt-5' width='200px' src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="Payment success" />
                    <div className="h1 text-center m-5 text-success">
                            PAYMENT SUCCESS !!!
                    </div>
                    <p className='p-2'>login with mobile number to see you order status </p>
                    <p>Go to <Link className='link' to={'/'}>homepage</Link></p>
            </div>
                )
        }
      {
        !id && (
            <div className="text-center ">
                    <img className='mt-5' width='200px' src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="Payment failure" />
                    <div className="h1 text-center m-5 text-success">
                            PAYMENT FAILED
                    </div>
                    <p className='p-2'>If amount has been debited, it will be credited in 3 working days </p>
                    <p>Go to <Link className='link' to={'/'}>homepage</Link></p>
            </div>
        )
      }
    </div>
  )
}
