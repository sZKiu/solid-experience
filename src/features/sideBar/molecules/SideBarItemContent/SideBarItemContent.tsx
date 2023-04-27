import { Component, Show } from 'solid-js';
import { Icon } from '@hope-ui/core';
import { Text } from 'solid-i18n';
import styles from './SideBarItemContent.module.css';
import { MdOutlineCategory } from 'react-icons/md';
import { SlSocialDropbox } from 'react-icons/sl';

interface SideBarItemProps {
    name: string;
    icon?: any;
    iconType: string;
    isLoading?: boolean;
    onClick: ( event: MouseEvent ) => void;
    getShowSubItems: any;
    routes: any;
    showItem: boolean;
    isLink: boolean;
    path: string;
    expanded: boolean;
    sectionSelected: string;
}

const SideBarItemContent: Component<SideBarItemProps> = ( props ) =>
{
    const IconProps: any = () => props.icon;

    return (
        <>
            <Show when={!props.iconType}>
                <Icon class={`${styles.side_bar_item_content_icon}`} >
                    <IconProps />
                </Icon>
            </Show>

            <Show when={props.iconType && props.icon}>
                <Show when={props.icon.includes( 'Md' )}>
                    <svg class={`${styles.side_bar_item_content_icon}`} viewBox="0 0 24 24" stroke="currentColor">
                        {/* @ts-ignore */}
                        <path stroke-linecap="round" stroke-linejoin="round" d={MdOutlineCategory().props.children[1].props.d} />
                    </svg>
                </Show>

                <Show when={props.icon.includes( 'Sl' )} >
                    <svg class={`${styles.side_bar_item_content_icon} text-white`} viewBox="0 0 1024 1024" >
                        {/* @ts-ignore */}
                        <path fill="currentColor" stroke-linecap="round" stroke-linejoin="round" d={SlSocialDropbox().props.children[0].props.d} />
                    </svg>
                </Show>
            </Show>

            <div class={`${styles.side_bar_item_content_container} ml-1`} classList={{
                [styles.side_bar_item_content_container_expanded]: !props.expanded,
            }}>
                <Text message={props.name} />
            </div>
        </>
    );
};

export default SideBarItemContent;
