import { useState, useEffect } from "react";



export const useFetch = (url, methodUsed) => {


    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({})

    useEffect(() => {
        if (!url) return
        setIsLoading(!isLoading);

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: `${methodUsed}`
                })

                const data = await response.json();
                setData(data);
            } catch (error) {
                console.log(error)
                setError(!error)
            }
            finally {
                setIsLoading(!isLoading)
            }
        }

        fetchData()

    }, [url])

    return { isLoading, data, error }
}