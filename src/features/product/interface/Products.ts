// import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { Category } from '../../category/interface/Category';

export interface Product {
    id: number;
    price: number;
    title: string;
    enable: boolean;
    category: Category;
}
