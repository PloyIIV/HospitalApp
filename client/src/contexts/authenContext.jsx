import axios from "axios";
import { createContext, useContext, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { useEffect } from "react";

const AuthContext = createContext();

const getState = () => {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.setItem("token", token)
        const UserDataFromToken = jwtDecode(token)
        return UserDataFromToken
    }
    return null
}

function AuthProvider(props) {
    // const url = 'http://localhost:3000'
    const url = 'https://hospital-app-backend-gamma.vercel.app/'
    const [loading, setLoading] = useState(null)
    const [state, setState] = useState({})

    const login = async (data) => {
        setLoading(true)
        const response = await axios.post(`${url}/auth/login`, data)
        const token = response.data.token
        if (token) {
            localStorage.setItem("token", token)
            setState(jwtDecode(token))
        }
        setLoading(false)
        return response.data
    }

    const register = async (data) => {
        const response = await axios.post(`${url}/auth/register`, data)
        return response.data
    }

    const logout = () => {
        localStorage.removeItem('token')
        setState({})
    }

    const isAuthen = Boolean(localStorage.getItem('token'))
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            setState(getState())
        }
    }, [])

    return (
        <AuthContext.Provider value={{ loading, state, url, login, logout, register, isAuthen }}>{props.children}</AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }