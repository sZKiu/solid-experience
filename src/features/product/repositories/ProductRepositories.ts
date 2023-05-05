import { AxiosRequestConfig } from 'axios';
import { config } from '../../shared/repositories/config';
import HttpProdAndCat from '../../../services/HttpProdAndCat';
import PayloadProps from '../../shared/interfaces/PayloadProps';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.products;

class ProductRepository
{
    public getProducts ()
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getAll}`,
        };

        return HttpProdAndCat.request( { config } );
    }

    public getOne ( { id }: { id: string } )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getOne}/${id}`,
        };

        return HttpProdAndCat.request( { config } );
    }

    public updateProduct ( { id, data }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpProdAndCat.request( { config } );
    }

    public createProduct ( { data }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data,
        };

        return HttpProdAndCat.request( { config } );
    }

    public removeProduct ( { id }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpProdAndCat.request( { config } );
    }
}

export default ProductRepository;
