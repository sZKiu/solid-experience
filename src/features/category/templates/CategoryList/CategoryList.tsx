import axios from 'axios';
import { Component, createSignal, onMount, Show } from 'solid-js';
import { Text } from 'solid-i18n';
import { permissions } from '../../../../config/permissions';
import CategoryCard from '../../organisms/CategoryCard/CategoryCard';
import { Category } from '../../interface/Category';

const CategoryList: Component<any> = () =>
{
    const [ getCategories, setCategories ] = createSignal<Category[] | any[]>( [] );

    async function getCategory ()
    {
        const response = await axios.get( 'http://localhost:8090/category' );
        return response.data;
    }

    onMount( async () =>
    {
        const { data } = await getCategory();
        setCategories( data );
    } );

    return (
        <section class="section_container">
            <header class="section_header_container" data-parent={permissions.ROLES.SAVE}>
                <h1 class="section_title">
                    <Text message="Category" />
                </h1>
            </header>

            <Show when={getCategories().length !== 0}>
                <CategoryCard categories={getCategories()} />
            </Show>

            <Show when={getCategories().length === 0}>
                <p class="flex justify-center text-2xl font-semibold text-white">No Categories to show...</p>
            </Show>
        </section>
    );
};

export default CategoryList;
