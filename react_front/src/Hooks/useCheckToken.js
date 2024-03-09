import React, { useState, useEffect, useContext } from "react"

const apiUrl = import.meta.env.VITE_API_URL;

/**
 * Here we set the token of the user and we store it in session storage
 * @author Abderahmane Adjali
 * @date 2023-03-05
 * @param {String} userToken
 * @returns {any}
 */
export const setToken = (userToken) => {
    return sessionStorage.setItem("token", userToken)
}

/**
 * Here we get the value of any value of session Storage
 * @author Abderahmane Adjali
 * @date 2023-10-05
 * @param {String} key
 * @returns {String}
 */
export const getToken = (key) => {
    return sessionStorage.getItem(key)
}

/**
 * Here we send a request to the Back-end to check if the tokken is still valid.
 * @author Abderahmane Adjali
 * @date 2023-10-05
 * @returns {any}
 */
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