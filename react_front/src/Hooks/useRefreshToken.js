export const useRefreshToken = async () => {
    /* Si l'utilisateur à un token expirer  */
    /* Envoyer une requête de refreshToken  */
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const response = await fetch(`${API_URL}/tokken/refreshToken`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        })
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}   