import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as constants from '../constants/routes'
// import * as constants from '../constants/routes'

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // console.log(constants.default.getInputRoute);
    navigate(constants.default.getInputRoute);
  }

  return (
    <div className='container'>
      <div className='text-center mt-5'>
        <button className='btn btn-success' onClick={handleClick}>
          Click here!
        </button>
      </div>
    </div>
  )
}

export default HomePage