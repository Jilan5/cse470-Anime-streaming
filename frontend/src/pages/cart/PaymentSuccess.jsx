import React from 'react'

const PaymentSuccess = () => {
  const tid = window.location.pathname.split('/').pop();
  return (
    <div className='btn glass h-20 '>
        <h1 className='text-2xl font-mono  text-yellow-400 '>PaymentSuccessful! Transaction ID: {tid}</h1>
    </div>
  )
}

export default PaymentSuccess;