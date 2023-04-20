import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { checkToken, getToken, setToken } from "../Hooks/checkToken";


const userContext = createContext();


export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(undefined)
    /* Préparer un état initial undefinded  */
    /* Si utilisateur est connécter objet remplie */
    /* Sinon on met Null */
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate();
    const logout = () => {
        setUserAuth(null);
        sessionStorage.removeItem('token');
        navigate("/")
    }

    useEffect(() => {
        const token = getToken('token');
        if (token != null) {
            checkToken()
                .then((response) => {
                    if (response.status === 401) {
                        sessionStorage.removeItem('token');
                        setUserAuth(null)
                    }
                    else {
                        response.json().then(data => {
                            setUserAuth(data)
                        })
                    }
                })
                .catch(err => console.log(err))
                .finally(() => setIsLoading(false))
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <userContext.Provider value={{ userAuth, setUserAuth, logout, isLoading }} >
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}


export default userContext
