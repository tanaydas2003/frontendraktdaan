import React from 'react'
import Form from '../../components/shared/Form/Form'
// import {useSelector} from "react-redux"
// import Spinner from '../../components/shared/Spinner'

const Login = () => {
  // const {loading,error} = useSelector(state => state.auth)
  return (
    <>
    {/* {loading ? (<Spinner/> ): ( */}
      
      <div className="row g-0">
        <div className="col-md-8 form-banner">
            <img src="./assets/images/banner1.jpg" alt="loginImage" />
        </div>
        <div className="col-md-4 form-container">
          <Form formTitle={'Login Page'} submitBtn={'Login'} formType={'login'} />
        </div>
      </div>
      {/* <div className="loginbody">
        <div className="container columnlogin">
          <div className="forms">
            <div className="form-login">
              <div className="form login">
                <Form formTitle={'Login Page'} submitBtn={'Login'} formType={'login'} />
              </div>
            </div>
          </div>
        </div>
      </div> */}

    {/* )} */}
    </>
  )
}

export default Login
