import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {useCallback, useReducer} from 'react';

type RequestOptions = {
  url: string;
  method: Method;
  params?: Record<string, any>;
  body?: any;
};

// Definición del estado y acciones para el reducer
interface State<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

type Action<T> =
  | {type: 'FETCH_START'}
  | {type: 'FETCH_SUCCESS'; payload: T}
  | {type: 'FETCH_ERROR'; payload: string};

const dataFetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'FETCH_START':
      return {...state, loading: true, error: undefined};
    case 'FETCH_SUCCESS':
      return {...state, loading: false, data: action.payload, error: undefined};
    case 'FETCH_ERROR':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

const useCustomFetch = <T = unknown>() => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/';

  const [state, dispatch] = useReducer(dataFetchReducer<T>, {
    data: undefined,
    error: undefined,
    loading: false,
  } as State<T>);

  const request = useCallback(
    async ({url, method, params, body}: RequestOptions) => {
      dispatch({type: 'FETCH_START'});

      const config: AxiosRequestConfig = {
        method,
        url: baseUrl + url,
        params,
        data: body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };

      try {
        const response = await axios<T>(config);
        dispatch({type: 'FETCH_SUCCESS', payload: response.data});
      } catch (error: any) {
        dispatch({type: 'FETCH_ERROR', payload: error.message});
      }
    },
    [],
  );

  return {
    ...state,
    get: (url: string, params?: Record<string, any>) =>
      request({method: 'GET', url, params}),
    post: (url: string, body?: any) => request({method: 'POST', url, body}),
    put: (url: string, body?: any) => request({method: 'PUT', url, body}),
    del: (url: string) => request({method: 'DELETE', url}),
  };
};

export default useCustomFetch;
