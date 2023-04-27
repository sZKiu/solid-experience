import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductList from '../../features/product/templates/ProductList/ProductList';

import { Component } from 'solid-js';

const IndexPage: Component = () =>
{
    return (
        <PrivateLayout>
            <ProductList/>
        </PrivateLayout>
    );
};

export default IndexPage;
