import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { parseGithubError } from './errorHandler';

export const createClient = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 10000,
    ...config,
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(parseGithubError(error));
    },
  );

  return instance;
};
