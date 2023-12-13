import {$authHost, $host} from "./index"
import {jwtDecode} from 'jwt-decode'

export const registration = async (username, password) => {
    const {data} = await $host.post('api/user/registration', {username, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchUsers = async () => {
    const {data} = await $host.get('api/user')
    return data
}

export const updateUser = async (user) => {
    const {data} = await $host.put('api/user', user)
    return data
}

export const deleteUser = async (id) => {
    const {data} = await $host.delete('api/user/' + id)
    return data
}

