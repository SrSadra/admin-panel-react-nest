import React, { SyntheticEvent, useState } from 'react'
import "./Register.css"
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [isSuccess , setIsSuccess] = useState({redirect: false})
    const [first_name , setFirst_name] = useState("");


    // let first_name = '';
    let last_name = '';
    let email = '';
    let password = '';
    let password_confirm = '';

    const Submit = async (e : SyntheticEvent) => {
        e.preventDefault(); // this prevent needing of reloading for submit

        console.log({first_name, email, password, password_confirm})

        const response = await axios.post("register", { first_name,last_name,email, password , password_confirm}, {headers: {"Content-Type": "application/json"}});

        setIsSuccess({redirect: true});
    } 



  if (isSuccess.redirect){
    return <Navigate to="/login" />
  }  

  
  return (
    <form className="form-signin" onSubmit={Submit}>
    <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

    <label htmlFor="firstName" className="sr-only">First Name</label>
    <input type="text" id="firstName" className="form-control" placeholder="First Name" required
           onChange={e => setFirst_name(e.target.value)}
    />

    <label htmlFor="lastName" className="sr-only">Last Name</label>
    <input type="text" id="lastName" className="form-control" placeholder="Last Name" required
           onChange={e => last_name = e.target.value}
    />

    <label htmlFor="inputEmail" className="sr-only">Email address</label>
    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
           onChange={(e) => email = e.target.value}
    />

    <label htmlFor="inputPassword" className="sr-only">Password</label>
    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
           onChange={e => password = e.target.value}
           required/>

    <label htmlFor="passwordConfirm" className="sr-only">Password Confirm</label>
    <input type="password" id="passwordConfirm" className="form-control" placeholder="Password Confirm"
           onChange={e => password_confirm = e.target.value}
           required/>

    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
    </form>
  )
}

export default Register
