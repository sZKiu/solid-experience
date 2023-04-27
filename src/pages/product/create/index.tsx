import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductForm from '../../../features/product/organisms/ProductForm/ProductForm';

import { Component } from 'solid-js';

const IndexPage: Component = () =>
{
    return (
        <PrivateLayout>
            <section class="section_container">

                <header class="section_header_container">
                    <h1 class="section_title">Create Product</h1>
                </header>

                <ProductForm/>

            </section>
        </PrivateLayout>
    );
};

export default IndexPage;
