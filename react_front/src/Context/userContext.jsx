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
    const [isCheckingToken, setIsCheckingToken] = useState(true)
    const navigate = useNavigate();
    const logout = () => {
        setUserAuth(null);
        sessionStorage.removeItem('token');
        navigate("/")
    }

    useEffect(() => {
        const token = getToken('token');
        console.log(`Le token que nous verifions est : ${token}`)
        if (token != null) {
            (async () => {
                try {
                    const response = await checkToken();
                    if (response.status === 401) {
                        sessionStorage.removeItem('token');
                        setUserAuth(null);
                    } else {
                        const data = await response.json();
                        console.log(data)
                        setUserAuth(data);
                    }
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                    setIsCheckingToken(false);
                }
            })();
        } else {
            setIsLoading(false);
            setIsCheckingToken(false);
        }
    }, []);


    return (
        <userContext.Provider value={{ userAuth, setUserAuth, logout, isLoading, isCheckingToken }} >
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(userContext)
}


export default userContext
