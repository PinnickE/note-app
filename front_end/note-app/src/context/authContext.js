import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("name") || null;
  });

  const login = (name, token, email) => {
    localStorage.setItem("name", name);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser(name);
  };

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 
 *Steps to Implement React Context API for Authentication
1. Create an AuthContext.js file
Use createContext() to create an authentication context.
Use useState to manage the user’s authentication state.
Create login() and logout() functions to update the authentication state.
Use useEffect to listen for localStorage changes.
2. Wrap the Entire App in AuthProvider
Import AuthProvider into index.js.
Wrap <BrowserRouter> with <AuthProvider> so all components can access authentication data.
3. Modify Header.js to Use the Context
Use useContext(AuthContext) to access user and logout().
Replace useState and useEffect with AuthContext.
When user changes, the UI updates automatically.
4. Update Login.js to Use AuthContext
Call login(name, token, email) instead of updating localStorage manually.
This ensures the username updates across components without a refresh.
5. Update Signup.js to Use AuthContext
After a successful signup, call login(name, token, email) to update the global state.
Redirect the user to the dashboard. 
 * 
 * 
 


 */