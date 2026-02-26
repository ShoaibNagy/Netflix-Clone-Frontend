import './Login.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';

const Login = () => {
  const [signState, setSignState] = useState("Login");


  return (
    <div className='login'>
      <img src={logo} alt="Netflix Logo" className="login-logo" />
      <div className="login-container">
        <form className='login-form'>
          <h1>{signState}</h1>
          {signState === "Register" ? <input type="text" placeholder='Your name' /> : <></>}
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <button>{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Remember Me</label>
            </div>

            <p>Need Help?</p>
          </div>

          <div className="form-switch">
            {signState === "Login" ? <p>New to Netflix? <span onClick={() => setSignState("Register")}>Register</span></p> : <p>Already have an account? <span onClick={() => setSignState("Login")}>Login</span></p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
