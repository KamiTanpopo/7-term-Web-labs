import React, {useContext} from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import {authRoutes, publicRoutes} from "../routes"
import {Context} from "../index"
import {LOGIN_ROUTE, USER_ROUTE} from "../utils/consts"
import {observer} from "mobx-react-lite"

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            {!user.isAuth && publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            {/*{!user.isAuth && <Route path="*" element={<Navigate to={LOGIN_ROUTE}/>}/>}*/}
            {/*{user.isAuth && <Route path="*" element={<Navigate to={USER_ROUTE}/>}/>}*/}
        </Routes>
    )
})

export default AppRouter