import { Component, createResource } from 'solid-js';
import CategoryTemplate from '../../features/category/templates/CategoryTemplate/CategoryTemplate';
import CategoryRepository from '../../features/category/repositories/CategoryRepositories';

const IndexPage: Component = () =>
{
    const categoryRepository = new CategoryRepository();

    const [ categories ] = createResource( () => categoryRepository.getCategories() );

    return (
        <CategoryTemplate
            categories={categories()}
        />
    );
};

export default IndexPage;
