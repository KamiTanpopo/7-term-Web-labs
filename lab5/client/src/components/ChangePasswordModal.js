import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

const ChangePasswordModal = ({show, handleClose, handleChangePass}) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handleSave = () => {
        if (newPassword === confirmNewPassword) {
            handleClose()
            setNewPassword('')
            setConfirmNewPassword('')
            handleChangePass(newPassword)
        } else {
            alert("Паролі не співпадають")
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Змінити пароль</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Новий пароль</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть новий пароль"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Новий пароль повторно</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Продублюйте новий пароль"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}
                        style={{
                            backgroundColor: '#E5E4E2',
                            color: 'black',
                            border: '2px solid white'
                        }}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={handleSave}
                        style={{
                            backgroundColor: '#106668',
                            color: 'white',
                            border: '2px solid white'
                        }}>
                    Зберегти зміни
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePasswordModal
