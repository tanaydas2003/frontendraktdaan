import React from 'react'
import Form from '../../components/shared/Form/Form'

const Register = () => {
  return (
    <>
      <div className="row g-0">
        <div 
          className="col-md-8 form-banner" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'  // Optional: background color for better contrast
          }}
        >
          <img 
            src="./assets/images/banner2.jpg" 
            alt="registerImage" 
            style={{ 
              width: '80%',          // Reduce the width of the image
              maxHeight: '80vh',     // Limit the maximum height
              objectFit: 'cover',    // Ensure the image covers the container nicely
              borderRadius: '8px',   // Add slight rounding for a softer look
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: add a subtle shadow
            }} 
          />
        </div>
        <div 
          className="col-md-4 form-container" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa',
            padding: '20px'
          }}
        >
          <Form formTitle={'Register'} submitBtn={"Register"} formType={'register'} />
        </div>
      </div>
    </>
  )
}

export default Register
