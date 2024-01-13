import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { checkToken, getToken, setToken } from "../Hooks/useCheckToken";
import { useRefreshToken } from "../Hooks/useRefreshToken";

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(undefined);
    const [authError, setAuthError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        setUserAuth(null);
        sessionStorage.removeItem('token');
        navigate("/");
    }, [navigate]);

    const checkTokenAndUpdate = useCallback(async () => {
        setIsLoading(true)
        const token = getToken('token');
        if (token) {
            try {
                const response = await checkToken();
                if (response.status === 401) {
                    const refreshToken = await useRefreshToken();
                    if (refreshToken.ok) {
                        const refreshTokenData = await refreshToken.json();
                        setUserAuth(refreshTokenData);
                        sessionStorage.setItem("token", refreshTokenData.accessToken);
                    } else {
                        throw new Error('Token refresh failed');
                    }
                } else {
                    const data = await response.json();
                    setUserAuth(data);
                }
            } catch (err) {
                setAuthError(err.message);
                logout();
            } finally {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        checkTokenAndUpdate();
    }, [checkTokenAndUpdate]);

    const contextValue = useMemo(() => ({
        userAuth,
        setUserAuth,
        logout,
        isLoading,
        authError
    }), [userAuth, logout, isLoading, authError]);

    return (
        <userContext.Provider value={contextValue} >
            {children}
        </userContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(userContext);
};

export default userContext;
