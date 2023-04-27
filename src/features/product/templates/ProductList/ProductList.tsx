import axios from 'axios';
import { Component, createSignal, onMount, Show } from 'solid-js';
import { Text } from 'solid-i18n';
import { permissions } from '../../../../config/permissions';
import { Link } from '@solidjs/router';
import { Button, Icon } from '@hope-ui/core';
import { darkPrimaryButton } from '../../../shared/constants/hopeAdapter';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import ProductCard from '../../organisms/ProductCard/ProductCard';
import { Product } from '../../interface/Products';

const ProductList: Component<any> = () =>
{
    const [ getProducts, setProducts ] = createSignal<Product[] | any[]>( [] );

    async function getCategory ()
    {
        const response = await axios.get( 'http://localhost:8090/product' );
        return response.data;
    }

    onMount( async () =>
    {
        const { data } = await getCategory();
        setProducts( data );
    } );

    return (
        <section class="section_container">
            <header class="section_header_container" data-parent={permissions.ROLES.SAVE}>
                <h1 class="section_title">
                    <Text message="Products" />
                </h1>

                <div class="w-[100%] md:w-auto">
                    <Link href={'/product/create'}>
                        <Button
                            leftIcon={<Icon><IconPlus/></Icon>}
                            _dark={darkPrimaryButton}
                            class={'w-[100%] sm:w-[100%]'}
                        >
                            <Text message="Create Product"/>
                        </Button>
                    </Link>
                </div>
            </header>

            <Show when={getProducts().length !== 0}>
                <ProductCard categories={getProducts()} />
            </Show>

            <Show when={getProducts().length === 0}>
                <p class="flex justify-center text-2xl font-semibold text-white">No Products to show...</p>
            </Show>
        </section>
    );
};

export default ProductList;
