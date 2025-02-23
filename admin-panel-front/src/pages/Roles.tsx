import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { Link } from 'react-router-dom'
import { Role } from '../classes/role'
import axios from 'axios'

const Roles = () => {
    const [roles , setRoles] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get("/roles");

                setRoles(data);
            }
        )();
    }, [])


   const del = async (id : number) => {
        if (window.confirm("are you sure?")){
            await axios.delete(`roles/${id}`);

            setRoles(roles.filter((el: Role) => el.id !== id ))
        }
   } 

  return (
    <Wrapper>

    <div className='pt-3 pb-2 mb-3'>
        <Link to="/roles/create" className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Add role</Link>
    </div>

    <div className="table-responsive small">

                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>

                    {roles.map((role: Role) => {
                        return (
                        <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>
                            <div>
                                <a className='btn btn-sm' onClick={() => del(role.id)}>Delete</a>
                            </div>
                        </td>
                        </tr>
                        )
                    })}

                </tbody>
                </table>
            </div>
    </Wrapper>
  )
}

export default Roles
