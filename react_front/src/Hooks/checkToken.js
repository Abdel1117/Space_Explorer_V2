
export const setToken = (userToken) => {
   return sessionStorage.setItem("token", JSON.stringify(userToken))
}

export const getToken = (key) => {
    return sessionStorage.getItem(key)    
}