import { createContext, useEffect, useState } from "react";

const errorMessage = createContext(null);
export const MessageErrorProvider = () => {
    const [message, setMessage] = useState("")

    return (
        <errorMessage.Provider value={{ initialValue, message, setMessage }}>
            {children}
        </errorMessage.Provider>
    )
}