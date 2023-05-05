import { AxiosRequestConfig } from 'axios';
import { config } from '../../shared/repositories/config';
import HttpProdAndCat from '../../../services/HttpProdAndCat';
import PayloadProps from '../../shared/interfaces/PayloadProps';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.categories;

class CategoryRepository
{
    public getCategories ()
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

    public updateCategory ( { id, data }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpProdAndCat.request( { config } );
    }

    public createCategory ( { data }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data,
        };

        return HttpProdAndCat.request( { config } );
    }

    public removeCategory ( { id }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpProdAndCat.request( { config } );
    }
}

export default CategoryRepository;
