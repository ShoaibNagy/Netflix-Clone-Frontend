import './Login.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { toast } from 'react-toastify';

const Login = () => {
  const [signState, setSignState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === "Login") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      // On success, Firebase auth state will change → App redirects via onAuthStateChanged
    } catch (error) {
      // Error already shown via toast in firebase.js
      // But we still need to stop loading
      toast.error("Authentication failed. Please try again.");
      throw error;
    } finally {
      setLoading(false); // ← CRITICAL: always turn off loading
    }
  };

  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div> :
      <div className='login'>
        <img src={logo} alt="Netflix Logo" className="login-logo" />
        <div className="login-container">
          <form className='login-form'>
            <h1>{signState}</h1>
            {signState === "Register" ? <input value={name} type="text" onChange={(e) => setName(e.target.value)} placeholder='Your name' /> : <></>}
            <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <button onClick={user_auth} type='submit'>{signState}</button>

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
