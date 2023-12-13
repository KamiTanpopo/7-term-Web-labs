import React, {useContext, useEffect, useState} from 'react'
import {deleteUser, fetchUsers} from "../http/userApi"
import {Context} from "../index";
import UserCard from "../components/UserCard";

const Admin = () => {
    const {user} = useContext(Context)
    const [users, setUsers] = useState([])
    const isAdmin = user.user.role === 'admin'

    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
    }, [])

    const handleDeleteClick = (id) => {
        deleteUser(id).then()
        users.filter(user => user.id !== id)
        fetchUsers().then(data => setUsers(data))
    }

    return (
        <div className="m-3 d-flex">
            {isAdmin ? users.filter(data => data.id !== user.user.id).map(user =>
                <UserCard user={user} handleDeleteClick={handleDeleteClick}/>
            ) : ''}
        </div>
    )
}

export default Admin