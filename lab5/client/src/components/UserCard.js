import React, {useState} from 'react'
import {deleteUser, updateUser} from "../http/userApi";

const UserCard = ({user, handleDeleteClick}) => {
    const [update, setUpdate] = useState(false)
    const [editedUser, setEditedUser] = useState({...user})

    const handleEditClick = () => {
        setUpdate(true)
        //setEditedUser({...user})
    }

    const handleCancelClick = () => {
        setUpdate(false)
        setEditedUser({ ...user })
    }

    const handleSaveClick = async () => {
        setUpdate(false)
        try {
            await updateUser(editedUser)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="card m-2" style={{width: '18rem'}}>
            <div className="card-body">
                {update ? (
                    <input
                        type="text"
                        value={editedUser.username}
                        onChange={(e) => setEditedUser(
                            {...editedUser, username: e.target.value}
                        )}
                    />
                ) : (
                    <h5 className="card-title">{editedUser.username}</h5>
                )}
            </div>
            <ul className="list-group list-group-flush">
                {update ? (
                    <li className="list-group-item">
                        Ім'я:
                        <input
                            type="text"
                            value={editedUser.name}
                            onChange={(e) => setEditedUser(
                                {...editedUser, name: e.target.value}
                            )}
                        />
                    </li>
                ) : (
                    <li className="list-group-item">Ім'я: {editedUser.name ? editedUser.name : "Не вказано"}</li>
                )}
                {update ? (
                    <li className="list-group-item d-flex">
                        Прізвище:
                        <input
                            type="text"
                            value={editedUser.surname}
                            onChange={(e) => setEditedUser(
                                {...editedUser, surname: e.target.value}
                            )}
                        />
                    </li>
                ) : (
                    <li className="list-group-item">Прізвище: {editedUser.surname ? editedUser.surname : "Не вказано"}</li>
                )}
                {update ? (
                    <li className="list-group-item d-flex">
                        Роль:
                        <select
                            value={editedUser.role}
                            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        >
                            <option value="user">Користувач</option>
                            <option value="admin">Адміністратор</option>
                        </select>
                    </li>
                ) : (
                    <li className="list-group-item">Роль: {editedUser.role}</li>
                )}
            </ul>
            <div className="card-body d-flex justify-content-between">
                {update ? (
                    <button className="btn btn-success" onClick={handleSaveClick} >
                        Зберегти
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={handleEditClick}
                    style={{
                        backgroundColor: '#E5E4E2',
                        color: 'black',
                        border: '2px solid white'
                    }}>
                        Редагувати
                    </button>
                )}
                {update ? (
                    <button className="btn btn-secondary" onClick={handleCancelClick}>
                        Відміна
                    </button>
                ) : (
                    <button className="btn btn-danger" onClick={() => handleDeleteClick(user.id)}
                    style={{
                        backgroundColor: '#106668',
                        color: 'white',
                        border: '2px solid white'
                    }}>
                        Видалити
                    </button>
                )}
            </div>
        </div>
    )
}

export default UserCard
