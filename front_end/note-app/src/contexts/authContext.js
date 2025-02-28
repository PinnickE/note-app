import { createContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [name, setName] = useState(() => {
        return localStorage.getItem("name" || "")
    })

    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("userId" || "")
    })

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token" || "")
    })


    const login = (name, email, token, userId) => {
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)
        localStorage.setItem("token", token)
        localStorage.setItem("userId", userId)
        setName(name)
        setUserId(userId)
        setToken(token)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')
        setName("")
        setUserId("")
    }

    return (
        <AuthContext.Provider value={{name, token, login, logout, userId}}>
            {children}
        </AuthContext.Provider>
    )


}









/**
 * Create an AuthContext.js file
 * use createContext() to create an au authentication context
 * use useState to manage the user's authnetication context
 */