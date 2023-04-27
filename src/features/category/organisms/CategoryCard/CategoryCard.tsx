import { Component, For } from 'solid-js';
import { Category } from '../../interface/Category';

interface CategoryCardProps {
    categories: Category[] | [];
}

const CategoryCard: Component<CategoryCardProps> = ( props ) =>
{
    return (
        <div class="grid_cards_container">
            <For each={props.categories}>
                {( data ) =>
                    <div class="p-4 bg-[#202425] rounded-md text-white w-fit font-medium">
                        <div class="flex gap-1 items-center">
                            <span class="text-lg">Name:</span>
                            <span class="text-gray-400">{data.title}</span>
                        </div>

                        <div class="flex gap-1 items-center">
                            <span class="text-lg">Enable:</span>
                            <span class="text-gray-400">{data.enable ? 'True' : 'False'}</span>
                        </div>
                    </div>
                }
            </For>
        </div>
    );
};

export default CategoryCard;
