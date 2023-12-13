import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, USER_ROUTE} from "../utils/consts"
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const isAdmin = user.user.role === 'admin'

    const logOut = () => {
        user.setUser(false)
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
        localStorage.removeItem('token')
    }

    return (
        <Navbar style={{ backgroundColor: '#137C7F' }} variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={USER_ROUTE}>Персональний кабінет</NavLink>
                {user.isAuth ?
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        {isAdmin ?
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Адмін панель
                            </Button>
                            : ''
                        }
                        <Button
                            variant={"outline-light"}
                            className='ms-2'
                            onClick={() => logOut()}
                        >
                            Вийти з облікового запису
                        </Button>
                    </Nav>
                    :
                    <Nav className="ms-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизація</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;