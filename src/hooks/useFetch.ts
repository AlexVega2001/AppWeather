import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
    const [state, setState] = useState({
        data: [],
        isLoading: true,
        errors: null
    })

    const {data, isLoading, errors} = state;

    const getFetch = async() => {
        try {
            const response = await fetch(url);
            const info = await response.json();
            setState({
                data: info,
                isLoading: false,
                errors: null
            })
        } catch (error: any) {
            setState({
                data: [],
                isLoading: false,
                errors: error
            })
        }
    }

    useEffect(() => {
        if(!url) return;
        getFetch();
    }, [url])
    

    return {
        data,
        isLoading,
        errors
    }
}
