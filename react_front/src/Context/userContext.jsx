import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { checkToken, getToken, setToken } from "../Hooks/checkToken";


const userContext = createContext();


export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState({})

    const logout = () => {
        setUserAuth({});
        sessionStorage.removeItem('token');
        location.href = '/';
    }
    useEffect(() => {
        const token = getToken('token');
        if (token != null) {
            checkToken()
                .then((response) => {
                    if (response.status === 401) {
                        console.log(response.json());
                        setUserAuth({})

                    }
                    else {
                        response.json().then(data => {
                            setUserAuth(data)
                        }
                        )
                    }
                })
                .catch(err => console.log(err))

        } else {


        }
    }, [])

    return (
        <userContext.Provider value={{ userAuth, setUserAuth, logout }} >
            {children}
        </userContext.Provider>
    )
}

export default userContext
