const useFetch = async (url, method, body) => {
    const token = sessionStorage.getItem('token');
    if (token != null || token != undefined) {

        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    "Authorization": `${token}`,
                    'Content-Type': 'application/json',

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