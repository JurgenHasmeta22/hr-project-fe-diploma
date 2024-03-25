import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface FetchState<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

type FetchFunction<T> = (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;

function useFetch<T = any>(): [FetchState<T>, FetchFunction<T>] {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        error: null,
        loading: false,
    });

    const fetchData: FetchFunction<T> = async (url, config) => {
        setState({ ...state, loading: true });

        try {
            const response = await axios(url, config);
            setState({ data: response.data, error: null, loading: false });
            return response;
        } catch (error) {
            setState({ data: null, error: error as Error, loading: false });
            throw error;
        }
    };

    return [state, fetchData];
}

export default useFetch;
