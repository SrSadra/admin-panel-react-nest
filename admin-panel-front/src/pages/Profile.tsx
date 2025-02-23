import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/configureStore';
import { useSelector } from 'react-redux';
import { fetchUser, setUser } from '../redux/states/user/userSlice';
import { User } from '../classes/user';

const Profile = () => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [password_confirm , setPassword_confirm] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);


    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);


    const updateInfo = async (e : SyntheticEvent) => {
        e.preventDefault();

        await axios.put("users/info", {
            first_name,
            last_name,
            email
        });

        dispatch(setUser(new User(first_name, last_name , user?.id, email, user?.role))); // update user
    }

    const passwordSubmit = (e : SyntheticEvent) => {
        e.preventDefault();

        axios.put("users/passxord", {
            password,
            password_confirm
        })
    }



  return (
    <Wrapper>

    <h2>Account Information</h2>
    <hr/>
    <form onSubmit={updateInfo}>
        <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" name="first_name"
                   defaultValue={first_name}
                   onChange={e => setFirst_name(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" name="last_name"
                   defaultValue={last_name}
                   onChange={e => setLast_name(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input type="text" className="form-control" name="email"
                   defaultValue={email}
                   onChange={e => setEmail(e.target.value)}
            />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
    </form>

    <h2 className="mt-4">Change Password</h2>
    <hr/>
    <form onSubmit={passwordSubmit}>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password"
                   onChange={e => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Password Confirm</label>
            <input type="password" className="form-control" name="password_confirm"
                   onChange={e => setPassword_confirm(e.target.value)}
            />
        </div>

        <button className="btn btn-outline-secondary">Save</button>
    </form>
    </Wrapper>
  )
}

export default Profile
