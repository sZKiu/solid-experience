import { Component, For } from 'solid-js';
import { Product } from '../../interface/Products';
import { IconButton } from '@hope-ui/core';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import ProductRepository from '../../repositories/ProductRepositories';

interface CategoryCardProps {
    categories: Product[] | [];
}

const ProductCard: Component<CategoryCardProps> = ( props ) =>
{
    const productRepository = new ProductRepository();

    return (
        <div class="grid_cards_container justify-items-center">
            <For each={props.categories}>
                {( data ) =>
                    <div class="p-4 bg-[#202425] rounded-md text-white w-fit font-medium min-w-[12rem]">
                        <div>
                            <div class="flex gap-1 items-center">
                                <span class="text-lg">Name:</span>
                                <span class="text-gray-400">{data.title}</span>
                            </div>

                            <div class="flex gap-1 items-center">
                                <span class="text-lg">Enable:</span>
                                <span class="text-gray-400">{data.enable ? 'True' : 'False'}</span>
                            </div>

                            <div class="flex gap-1 items-center">
                                <span class="text-lg">Price:</span>
                                <span class="text-gray-400">{data.price}</span>
                            </div>

                            <div class="flex gap-1 items-center">
                                <h4 class="text-lg">Category:</h4>
                                <span class="text-gray-400">{data.category.title}</span>
                            </div>
                        </div>

                        <div class="flex justify-center mt-2" onClick={() =>
                        {
                            productRepository.removeProduct( { id: data.id } );

                            location.reload();
                        }} >
                            <IconButton
                                size={'md'}
                                class="w-6"
                                aria-label="View notifications"
                                children={<IconTrash/>}
                                borderRadius={'4px'}
                                _dark={{ border: 'none', bgColor: 'transparent', color: 'danger.200' }}
                                _hover={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                }
            </For>
        </div>
    );
};

export default ProductCard;
