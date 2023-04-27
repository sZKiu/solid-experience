import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import CategoryList from '../../features/category/templates/CategoryList/CategoryList';
import { Component } from 'solid-js';

const IndexPage: Component = () =>
{
    return (
        <PrivateLayout>
            <CategoryList/>
        </PrivateLayout>
    );
};

export default IndexPage;
