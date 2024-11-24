import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    //add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.tokens?.accessToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //add a response interceptor

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          //   try {
          const refreshToken = auth?.tokens?.refreshToken;
          const response = await axios.post(
            `${import.meta.VITE_SERVER_BASE_URL}/api/auth/refresh-token`,
            { refreshToken }
          );
          const { token } = response.data;
          console.log(token);

          setAuth({ ...auth, tokens: token });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
          //   } catch (error) {
          //     throw error;
          //   }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, setAuth]);
  return { api };
};
