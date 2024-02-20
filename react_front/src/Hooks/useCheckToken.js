import React, { useState, useEffect, useContext } from "react"

const apiUrl = import.meta.env.VITE_API_URL;


export const setToken = (userToken) => {
    return sessionStorage.setItem("token", userToken)
}

export const getToken = (key) => {
    return sessionStorage.getItem(key)
}
export const checkToken = async () => {
    try {
        const response = await fetch(`${apiUrl}/tokken/check`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${sessionStorage.getItem("token")}`,

                },
            })
            ;

        return response;
    }
    catch (err) {
        console.log(err)
    }
};