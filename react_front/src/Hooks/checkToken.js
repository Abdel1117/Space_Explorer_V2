import React, { useState, useEffect, useContext } from "react"


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
                    refreshToken: `${sessionStorage.getItem("refreshToken")}`
                },
            })
            ;

        return response;
    }
    catch (err) {
        console.log(err)
    }
};






