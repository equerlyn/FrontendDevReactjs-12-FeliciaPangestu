import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className='error-page'>
      <h1>404 Pages</h1>
      <p>Page not found!</p>
      <p className='back' onClick={()=>navigate('/')}>Back</p>
    </div>
  )
}

export default ErrorPage