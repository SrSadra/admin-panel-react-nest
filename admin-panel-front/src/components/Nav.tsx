import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { User } from '../classes/user';

const Nav = () => {
    const [user , setUser] = useState(new User);


    useEffect(() => {
        ( async () => {
            const {data} = await axios.get("user"); // this data is exact user
            console.log(data);
            
            setUser(new User(data.first_name , data.last_name , data.id , data.email, data.role));
            
        }
            
        )();

    }, [])

    const onSignOut = async () => {
        await axios.post("/logout" , {});
    }


  return (
    <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">Company name</a>

      <ul className="navbar-nav flex-row ">
        {/* <li className="nav-item text-nowrap">
          <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
            <svg className="bi"><use href="#search"/></svg>
          </button>
        </li>
        <li className="nav-item text-nowrap">
          <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <svg className="bi"><use href="#list"/></svg>
          </button>
        </li> */}

        <li><Link className='p-2 text-white' to='/login' onClick={onSignOut}>Sign Out</Link> </li>
        <li><Link className='p-2 text-white' to='/profile'>{user?.name}</Link></li>
      </ul>

      {/* <div id="navbarSearch" className="navbar-search w-100 collapse">
        <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"></input>
      </div> */}
    </header>
  )
}

export default Nav
