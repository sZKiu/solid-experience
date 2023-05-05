import { Component, Show } from 'solid-js';
import { Text } from 'solid-i18n';
import { permissions } from '../../../../config/permissions';
import CategoryCard from '../../organisms/CategoryCard/CategoryCard';
import PrivateLayout from '../../../shared/layout/PrivateLayout/PrivateLayout';

const CategoryTemplate: Component<any> = ( props ) =>
{
    return (
        <PrivateLayout>
            <section class="section_container">
                <header class="section_header_container" data-parent={permissions.ROLES.SAVE}>
                    <h1 class="section_title">
                        <Text message="Category" />
                    </h1>
                </header>

                <Show when={props?.categories?.length !== 0}>
                    <CategoryCard categories={props?.categories} />
                </Show>

                <Show when={props?.categories?.length === 0}>
                    <p class="flex justify-center text-2xl font-semibold text-white">No Categories to show...</p>
                </Show>
            </section>
        </PrivateLayout>
    );
};

export default CategoryTemplate;
