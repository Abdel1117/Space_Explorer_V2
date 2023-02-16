import React, { useState, useEffect, useContext } from "react"
import userContext from "../Context/userContext"


export const setToken = (userToken) => {
    return sessionStorage.setItem("token", userToken)
}

export const getToken = (key) => {
    return sessionStorage.getItem(key)
}
export const checkToken = async () => {
    try {
        const response = await fetch("http://localhost:4000/check",
            {
                method: "GET",
                headers: {
                    authorization: `${sessionStorage.getItem("token")}`,
                },
            })
            ;

        if (response.status === 200) {
            const data = await response.json();
            return data
        } else {
            const errorMessage = await response.json();
            return errorMessage
        }
    }
    catch (err) {
        console.log(err)
    }
};






