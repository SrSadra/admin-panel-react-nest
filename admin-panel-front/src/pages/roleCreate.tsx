import axios from "axios"
import Wrapper from "../components/Wrapper"
import { SyntheticEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./UserCreate.css"

const RoleCreate = () => {
    const [name , setName] = useState("")
    const navigate =  useNavigate();

    // useEffect(() => {
    //     (
    //     async () => {
            
    //     const {data} = await axios.get("/roles");
    //     console.log(data);
        
    //     setRoles(data);
    // }
    // )();
    // }, []);

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post("roles" , {
            name
        });

        await navigate("/roles");
    }

  return (
    <Wrapper>
        <div className='registration-form' >
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control item" id="name" placeholder="name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-account">Create Role</button>
            </div>
        </form> 
        </div>
    </Wrapper>
  )
}

export default RoleCreate