import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index"
import {observer} from "mobx-react-lite"
import {updateUser} from "../http/userApi"
import ChangePasswordModal from "../components/ChangePasswordModal"

const User = observer(() => {
    const {user} = useContext(Context)
    const [userData, setUserData] = useState(user.user)
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleChangePass = (newPassword) => {
        setShowModal(false)
        setUserData({...userData, 'password': newPassword})
        updateUser({id: userData.id, username: userData.username, password: newPassword}).then()
        alert("Пароль змінено успішно!")
    };

    useEffect(() => {
        setUserData(user.user)
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const handleSave = async () => {
        user.setUser(userData)
        try {
            await updateUser(userData)
            alert("Оновлено")
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="container">
            <ChangePasswordModal show={showModal} handleClose={handleCloseModal} handleChangePass={handleChangePass}/>
            <h2 className="mt-5">Кабінет користувача</h2>
            <div className="form-group">
                <label>Логін:</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Ім'я:</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>Прізвище:</label>
                <input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={userData.surname}
                    onChange={handleInputChange}
                />
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-primary mt-3" onClick={handleSave} 
                        style={{
                            backgroundColor: '#106668',
                            color: 'white',
                            border: '2px solid white'
                        }}>
                    Зберегти
                </button>
                <div style={{textDecoration: "underline", cursor: "pointer"}} onClick={handleShowModal}>Змінити пароль
                </div>
            </div>
        </div>
    )
})

export default User