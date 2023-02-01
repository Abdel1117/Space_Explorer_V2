import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";


const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState({})

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
