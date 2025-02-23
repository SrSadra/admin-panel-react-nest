import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios'
import { User } from '../classes/user'
import { Link } from 'react-router-dom'
import Paginator from '../components/Paginator'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/configureStore'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../redux/states/user/userSlice'

const Users = () => {

    const [users , setUsers] = useState([]);
    const [currectPage , setCurrentPage] = useState(1);
    const [lastPage , setLastpage] = useState(0);

    const {user} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        (
            async () => {
                
                const {data} = await axios.get(`users?page=${currectPage}`);
                setUsers(data.data.filter((el) => {
                    if (el.id !== user?.id){
                        return new User(el.first_name, el.last_name , el.id , el.email, el.role);
                    }
                }));
                setLastpage(data.meta.last_page);
            }
        )();
    }, [currectPage, user]);

    useEffect(() => {
        dispatch(fetchUser)
    }, [dispatch])


    const del = async (id : number) => {
        if (window.confirm("Are you sure?!")){
            await axios.delete(`users/${id}`);
            setUsers(users.filter((el: User) => el.id !== id));
        }
    }


  return (
    <Wrapper>

    <div className='pt-3 pb-2 mb-3'>
        <Link to="/users/create" className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Add user</Link>
    </div>

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
 
                    {users.map((userEl: User) => {
                        return (
                        <tr key={userEl.id}>
                        <td>{userEl.id}</td>
                        <td>{userEl.name}</td>
                        <td>{userEl.email}</td>
                        <td>{userEl.role.name}</td>
                        <td>
                            <div>
                                <a className='btn btn-sm' onClick={() => del(userEl.id)}>Delete</a>
                            </div>
                        </td>
                        </tr>
                        )
                    })}

                </tbody>
                </table>
            </div>
            <Paginator currectPage={currectPage} lastPage={lastPage} pageChanged={(page) => setCurrentPage(page)} /> {/* we can also use this function like setCurrentPage */}
        </Wrapper>
  )
}

export default Users
