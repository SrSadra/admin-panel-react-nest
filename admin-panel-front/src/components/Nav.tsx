import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/configureStore';
// import { fetchUser } from '../redux/states/user/userSlice';
import { fetchUser, setUser } from '../redux/states/user/userSlice';

const Nav = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.user); // we can access user state using state.user - the last user is user object
  

    useEffect(() => {
      dispatch(fetchUser());
    }, [dispatch])

    const onSignOut = async () => {
        await axios.post("/logout" , {});
        dispatch(setUser(null)); // this will reset user
    }


  return (
    <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
    <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">
      Company name
    </a>

    <ul className="navbar-nav flex-row">
      {loading ? (
        <li className="p-2 text-white">Loading...</li>
      ) : error ? (
        <li className="p-2 text-danger">{error}</li>
      ) : user ? (
        <>
          <li>
            <Link className="p-2 text-white" to="/profile">
              {user.name}
            </Link>
          </li>
          <li>
            <Link className="p-2 text-white" to="/login" onClick={onSignOut}>
              Sign Out
            </Link>
          </li>
        </>
      ) : (
        <li>
          <Link className="p-2 text-white" to="/login">
            Login
          </Link>
        </li>
      )}
    </ul>
  </header>
  )
}

export default Nav
