import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkToken, getToken, setToken } from "../Hooks/checkToken";


const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState({})

    useEffect(() => {
        const token = getToken('token');
        if (token != null) {
            console.log(token)
            checkToken();

        } else {
            setUserAuth({})
        }
    }, [])

    return (
        <userContext.Provider value={{ userAuth, setUserAuth }} >
            {children}
        </userContext.Provider>
    )
}

export const userConsumer = () => {
    return useContext(userContext);
}

export default userContext
