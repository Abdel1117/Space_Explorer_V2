const useFetch = async (url, method, body) => {
    const token = sessionStorage.getItem('token');
    if (token != null || token != undefined) {

        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: {
                    "Authorization": `${token}`,
                }
            })

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);

        }
    }
}

export { useFetch };