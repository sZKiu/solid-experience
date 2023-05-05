import { AxiosInstance } from 'axios';
import { IHttpServiceParams } from './IHttpAxios';
import { createAxios } from './HttpHelper';

class HttpProdAndCat
{
    static async request ( data: IHttpServiceParams )
    {
        const { config } = data;

        const http: AxiosInstance = createAxios();

        return ( await http.request( {
            ...config,
        }
        ) ).data.data;
    }
}

export default HttpProdAndCat;
