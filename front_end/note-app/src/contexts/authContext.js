import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [name, setName] = useState(() => {
        return localStorage.getItem("name" || "")
    })

    const login = (name, email, token) => {
        localStorage.setItem("name", name)
        localStorage.setItem("email", email)

        localStorage.setItem("token", token)
        setName(name)
    }

    return (
        <AuthContext.Provider value={{name, login}}>
            {children}
        </AuthContext.Provider>
    )


}









/**
 * Create an AuthContext.js file
 * use createContext() to create an au authentication context
 * use useState to manage the user's authnetication context
 */