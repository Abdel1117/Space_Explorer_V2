import React, {useState, useEffect, useContext} from "react"
import userContext, {userConsumer} from "../Context/userContext"


export const setToken = (userToken) => {
   return sessionStorage.setItem("token", userToken)
}

export const getToken = (key) => {
    return sessionStorage.getItem(key)    
}
export const checkToken = async () => {
   
    const response = await fetch("http://localhost:4000/check", 
    {
        method : "GET", 
        headers : {
            authorization : `${sessionStorage.getItem("token")}`,
        },
    })
   .then((res)=>{

    if(res.status === 200){
       return res.json();
    }
})
.then((data) => { console.log(data) 
    return data 
})
.catch(err => console.log(err))
 }







