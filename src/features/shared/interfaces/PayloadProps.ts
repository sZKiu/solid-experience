import { LoginApi } from '../../auth/interfaces/login';

interface PayloadProps<T=Record<string, any>>
{
    user?: LoginApi;
    queryParams?: any;
    id?: string | number;
    data?: T;
}

export default PayloadProps;
