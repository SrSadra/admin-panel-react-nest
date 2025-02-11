import React, { useEffect } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Wrapper = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        (
            async () => {
        try{
            const res = await axios.get("user");
        }catch {
            navigate("/login");
        }}
    )();
    }, [navigate])

  return (
    <>
    <Nav />

    <div className="container-fluid">
      <div className="row">
       
      <Menu />

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
        </main>
      </div>
    </div>  
    </>
  )
}

export default Wrapper
