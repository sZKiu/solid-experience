import ProductTemplate from '../../features/product/templates/ProductTemplate/ProductTemplate';
import ProductRepository from '../../features/product/repositories/ProductRepositories';
import { Component, createResource } from 'solid-js';

const IndexPage: Component = () =>
{
    const productRepository = new ProductRepository();

    const [ products ] = createResource( () => productRepository.getProducts() );

    return (
        <ProductTemplate
            products={products()}
        />
    );
};

export default IndexPage;
