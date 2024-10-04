/* eslint-disable no-unsafe-finally */
import Axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { AppConfig } from './AppConfig';
import { store } from '../Store/Store';
// import { setLoader } from '../Store/GeneralReducer';
import { getAccessToken, getRefreshToken } from '../Utils/Getters';
import { Utility } from '../Utils/Utility';
import { ToastType } from '../Utils/Const';
import _ from 'lodash';
import { EndPoints } from './EndPoints';
import { CommonApis } from '../Utils/CommonApis';
import { Platform } from 'react-native';
import { updateTokenData } from '../Store/Auth';
import { RefreshTokenApiResponse } from '../Interfaces/Network';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const axiosInstance = Axios.create({
  baseURL: AppConfig.baseUrl,
});

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// const checkIfTokenIsExpired = async ({ url }: { url: string }) => {
//   if (!isRefreshing) {
//     isRefreshing = true;
//   }

//   const updatedToken = await refreshAccessToken();
//   isRefreshing = false;
//   console.log('new accessToken: ', updatedToken);

//   if (updatedToken?.length && globalThis.oldApiPayload[url]) {
//     return APICall({ ...globalThis.oldApiPayload[url], updatedToken });
//   }
// };

const refreshAccessToken = async (): Promise<string | undefined> => {
  const refreshToken = getRefreshToken();
  if (refreshToken.length) {
    try {
      const response = await APICall<RefreshTokenApiResponse>({
        url: EndPoints.refreshToken,
        method: 'post',
        payload: { refresh_token: refreshToken },
      });
      const newAccessToken = response.data.data.access_token;
      console.log(newAccessToken, 'newAccessToken');
      store.dispatch(
        updateTokenData({
          access_token: newAccessToken,
          access_token_expireIn: response.data.data.access_token_expireIn,
          refresh_token: response.data.data.refresh_token,
          refresh_token_expireIn: response.data.data.refresh_token_expireIn,
        }),
      );
      return newAccessToken;
    } catch (error) {
      // store.dispatch(removeAuthData());
      Utility.showToast(ToastType.error, 'Session expired. Please login again.');
      throw error;
    }
  }
  return undefined;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    console.log(`axios request : ${config?.url} =>`, config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response) => {
    console.log(`<= Response : ${response?.config?.url} : Status - ${response?.status} `, response);
    if (!response?.data?.status) {
      Utility.showToast(ToastType.error, response?.data?.message);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          onRefreshed(newToken);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error('Failed to refresh token');
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

const getFormData = (object: { [key: string]: any }) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key] !== undefined && object[key] !== null && object[key] !== '') {
      if (Array.isArray(object[key])) {
        object[key].forEach((item: any) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, object[key]);
      }
    }
  });
  return formData;
};

export interface APICallParams {
  method?: 'get' | 'post' | 'put' | 'delete';
  payload?: any;
  url: string;
  headers?: AxiosRequestHeaders;
  formData?: boolean;
  removeLoader?: boolean;
  removeToken?: boolean;
  updatedToken?: string;
}

const APICall = async <T>({
  method = 'post',
  payload = null,
  url = '',
  formData = false,
  updatedToken = '',
}: APICallParams): Promise<AxiosResponse<T>> => {
  const token = getAccessToken();
  const config: AxiosRequestConfig = {
    method: method.toLowerCase(),
    timeout: 1000 * 60 * 2,
    url,
    headers: {
      'Content-Type': formData ? 'multipart/form-data' : 'application/json',
      ...((token || updatedToken.length) && {
        Authorization: `Bearer ${updatedToken.length ? updatedToken : token}`,
      }),
    },
  };

  if (payload && method.toLowerCase() === 'get') {
    config.params = payload;
  } else if (payload && method.toLowerCase() === 'post') {
    if (formData) {
      const formData = getFormData(payload);
      config.data = formData;
    } else {
      config.data = payload;
    }
  }

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data?.error) {
            reject({
              statusCode: error.response,
              data: {
                ...error.response.data,
                message: error?.response?.data?.error,
              },
            });
          }
          reject(error);
        }
        reject({
          statusCode: 500,
          data: { message: error.message ?? error.error ?? 'Something went wrong!' },
        });
      });
  });
};

export default APICall;
