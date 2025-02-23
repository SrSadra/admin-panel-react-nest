import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import "./UserCreate.css"
import axios from 'axios'
import { Role } from '../classes/role'
import { useNavigate } from 'react-router-dom'

const UserCreate = () => {
    const [first_name , setFirstname] = useState("")
    const [last_name , setLastname] = useState("")
    const [email , setEmail] = useState("")
    const [role_id , setRoleId] = useState("")
    const [mainRoles, setRoles] = useState([]);
    const navigate =  useNavigate();

    useEffect(() => {
        (
        async () => {
            
        const {data} = await axios.get("/roles");
        console.log(data);
        
        setRoles(data);
    }
    )();
    }, []);

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post("users" , { // to create user
            first_name,
            last_name,
            email,
            role_id
        });

        await navigate("/users");
    }

  return (
    <Wrapper>
        <div className='registration-form' >
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control item" id="firstname" placeholder="firstname" onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="lastname" placeholder="lastname" onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Role</label>
                <select className='form-control' onChange={(e) => setRoleId(e.target.value)}>
                    {
                        mainRoles.map((el : Role) => {
                            return (
                            <option key={el.id} value={el.id}>{el.name}</option>
                            )
                    })
                    }
                </select>
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-account">Create Account</button>
            </div>
        </form> 
        </div>
    </Wrapper>
  )
}

export default UserCreate
