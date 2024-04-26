import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import React, { useContext } from 'react';
import { AppContext } from '@/contexts/app';

export const useAxios = () => {
  const axiosConfig = {
    headers: {
      "Accept": "application/json"
    }
  }

  const axiosInstance = axios.create(axiosConfig)
  axiosInstance.interceptors.response.use((response) => {
    return response;
  }, (error: AxiosError) => {
    return Promise.reject(error)
  })

  return axiosInstance;
}

export const useDataFetch = <T>(path: string, axiosConfig?: AxiosRequestConfig): () => Promise<T>  => {
  const { qAxios } = useContext(AppContext);

  return async (): Promise<T> => {   
    try {
      const response = await qAxios.get(path, axiosConfig)        
      return response.data
    } catch(e) {
      throw e as AxiosError;
    }
  }
}
