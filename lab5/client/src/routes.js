import {
    LOGIN_ROUTE, REGISTRATION_ROUTE,
    USER_ROUTE, ADMIN_ROUTE,
} from "./utils/consts"

import User from "./pages/User"
import Auth from "./pages/Auth"
import Admin from "./pages/Admin";

export const publicRoutes = [
    {path: LOGIN_ROUTE, Component: Auth},
    {path: REGISTRATION_ROUTE, Component: Auth},
]

export const authRoutes = [
    {path: USER_ROUTE, Component: User},
    {path: ADMIN_ROUTE, Component: Admin},
]