const useFetch = async (url, method) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Authorization": `${token}`
            }
        })

        const data = response.json();
        console.log(data);
    } catch (error) {
        console.log(error);

    }
}

export { useFetch };