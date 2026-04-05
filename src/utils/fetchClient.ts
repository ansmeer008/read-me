import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

export const createClient = (config: AxiosRequestConfig): AxiosInstance => {
    const instance = axios.create({
        timeout: 10000,
        ...config
    });

    instance.interceptors.response.use((response) => response, 
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    })

    return instance;
}