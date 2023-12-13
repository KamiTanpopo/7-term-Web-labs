import React, {useContext, useState} from 'react'
import {Button, Card, Container, Form, Row} from "react-bootstrap"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {LOGIN_ROUTE, REGISTRATION_ROUTE, USER_ROUTE} from "../utils/consts"
import {login, registration} from "../http/userApi"
import {observer} from "mobx-react-lite"
import {Context} from "../index"

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if(isLogin)
                data = await login(username, password)
            else
                data = await registration(username, password)

            user.setUser(data)
            user.setIsAuth(true)
            navigate(USER_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Вхід в аккаунт' : 'Реєстрація аккаунту'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть логін"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <div style={{width: "auto"}}>
                                Немає аккаунту? <NavLink to={REGISTRATION_ROUTE}>Зареєструйтесь!</NavLink>
                            </div>
                            :
                            <div style={{width: "auto"}}>
                                Вже маєте аккаунт? <NavLink to={LOGIN_ROUTE}>Авторизуйтесь!</NavLink>
                            </div>
                        }
                        <Button
                            style={{width: "auto", marginRight: 12} }
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? "Зайти" : "Створити"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth