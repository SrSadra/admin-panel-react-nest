import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios'
import { User } from '../classes/user'

const Users = () => {

    const [users , setUsers] = useState([]);
    const [currectPage , setCurrentPage] = useState(1);
    const [lastPage , setLastpage] = useState(0);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (
            async () => {
                const {data} = await axios.get(`users?page=${currectPage}`);
                setUsers(data.data.map((user) => {
                    return new User(user.first_name, user.last_name , user.id , user.email, user.role);
                }));
                setLastpage(data.meta.last_page);
            }
        )
    }, [currectPage]);

    const onNextPage = () => {
        if (currectPage < lastPage){
            setCurrentPage(currectPage + 1);
        }
    }

    const onPrevPage = () => {
        if (currectPage > 0){
            setCurrentPage(currectPage - 1);
        }
    }


  return (
    <Wrapper>

    <div className="table-responsive small">
                <table className="table table-striped table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">role</th>
                    <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
 
                    {users.map((user: User) => {
                        return (
                        <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role.name}</td>
                        <td></td>
                        </tr>
                        )
                    })}

                </tbody>
                </table>
            </div>

            <nav>
                <ul className='pagination'>
                    <li onClick={onPrevPage}>prev</li>
                    <li onClick={onNextPage}>next</li>
                </ul>
            </nav>
        </Wrapper>
  )
}

export default Users
