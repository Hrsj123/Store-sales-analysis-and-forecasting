import React from 'react'

const Footer = () => {
  return (
    <footer 
        className="footer" 
        style={{
            backgroundColor: "#f1f1f1", 
        }}
    >
      <p className='text-center pt-3'>© {new Date().getFullYear()} Store Analysis</p>
    </footer>
  )
}

export default Footer