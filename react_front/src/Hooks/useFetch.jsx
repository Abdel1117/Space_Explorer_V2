
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
            return { status: response.status, data: data };
        } catch (error) {
            return { status: 500, error: error.message };
        }
    }
}

export { useFetch };