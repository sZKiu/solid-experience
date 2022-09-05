import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHttpServiceParams } from './IHttpAxios';
import { createAxios, getParams, getRequestDefaultOptions } from './HttpHelper';

class HttpService
{
    static async request<T> ( data: IHttpServiceParams )
    {
        const { config, queryParams, user } = data;

        const requestDefaultOptions: AxiosRequestConfig = getRequestDefaultOptions( config, user?.token );
        const http: AxiosInstance = createAxios();
        const params: URLSearchParams = getParams( queryParams );

        return ( await http.request<T>( {
            ...requestDefaultOptions,
            params,
        }
        ) ).data;
    }
}

export default HttpService;
