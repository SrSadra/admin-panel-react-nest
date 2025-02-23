import React, { SyntheticEvent, useState } from 'react'
import "./Login.css"
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch<AppDispatch>();

    const Submit = async (e : SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.post("login" , {email, password: pass}) // withcredentials set to true we can acces cookies from back
        console.log(response.data);

        // dispatch(loginUser({email, password: pass}));

        // setRedirect(true);
        navigate("/")
    }

    // if (redirect){
    //     console.log("oyy");
        
    //     <Navigate to="/" />
    // }

  return (
    <div>
    <form onSubmit={Submit}>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    <div className="form-floating">
      <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
      <label htmlFor="floatingInput">Email address</label>
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPass(e.target.value)}/>
      <label htmlFor="floatingPassword">Password</label> 
    </div>
    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
    </div>
  )
}

export default Login
