import { createSignal } from 'solid-js';
import { Button, FormControl, FormControlLabel, Input } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Component } from 'solid-js';
import { Text, useI18n } from 'solid-i18n';
import { darkInput, darkNeutralButton, darkPrimaryButtonWithBackground, placeholderInput } from '../../../shared/constants/hopeAdapter';
import ProductRepository from '../../repositories/ProductRepositories';


const UserForm: Component<any> = () =>
{
    const productRepository = new ProductRepository();
    const i18n = useI18n();
    const { t } = i18n;

    const [ getTitle, setTitle ] = createSignal( '' );
    const [ getEnable, setEnable ] = createSignal( '' );
    const [ getPrice, setPrice ] = createSignal( '' );
    const [ getCatTitle, setCatTitle ] = createSignal( '' );
    const [ getCatEnable, setCatEnable ] = createSignal( '' );

    const onSubmit = ( e: Event ) =>
    {
        e.preventDefault();

        productRepository.createProduct( { data: {
            title: getTitle(),
            enable: getEnable() == 'False' || getEnable() == 'false' ? false : true,
            price: typeof Number( getPrice() ) === 'number' ? Number( getPrice() ) : 0,
            category: {
                title: getCatTitle(),
                enable: getEnable() == 'False' || getEnable() == 'false' ? false : true,
            },
        } } );

        setTimeout( () =>
        {
            location.assign( '/product' );
        }, 500 );
    };

    return (
        <form class="form_flex" onSubmit={onSubmit}>
            <h2 class="section_title_opaque border_bottom">
                <Text message="Product Information" />
            </h2>

            <div class="field_wrapper">
                <FormControl isRequired>
                    <FormControlLabel class={'form_label'} for="Title" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="Title"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="Title"
                        type="text"
                        placeholder={t( 'Enter a Title' ) as string}
                        onChange={( e ) => setTitle( e.target.value )}
                    />
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired>
                    <FormControlLabel class={'form_label'} for="Enable" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="Enable"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="Enable"
                        type="text"
                        placeholder={t( 'Enter a Enable' ) as string}
                        onChange={( e ) => setEnable( e.target.value )}
                    />
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired>
                    <FormControlLabel class={'form_label'} for="Price" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="Price"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="Price"
                        type="text"
                        placeholder={t( 'Enter a Price' ) as string}
                        onChange={( e ) => setPrice( e.target.value )}
                    />
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired>
                    <FormControlLabel class={'form_label'} for="Category Title" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="Category Title"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="Category Title"
                        type="text"
                        placeholder={t( 'Enter a Category Title' ) as string}
                        onChange={( e ) => setCatTitle( e.target.value )}
                    />
                </FormControl>
            </div>

            <div class="field_wrapper">
                <FormControl isRequired>
                    <FormControlLabel class={'form_label'} for="Enable" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="Category Enable"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="Enable"
                        type="text"
                        placeholder={t( 'Enter a Category Unable' ) as string}
                        onChange={( e ) => setCatEnable( e.target.value )}
                    />
                </FormControl>
            </div>

            <div class="update_save_buttons_container">
                {
                    getTitle().length !== 0 && getEnable().length !== 0 && getPrice().length !== 0 && getCatTitle().length !== 0 && getCatEnable().length !== 0 && <div class="button_full">
                        <Button
                            _dark={darkPrimaryButtonWithBackground}
                            class="button_full"
                            type="submit"
                            loadingText={<Text message="a_submitting"/> as string}
                        >
                            <Text message="a_save"/>
                        </Button>
                    </div>
                }
                <div class="button_full fallback">
                    <Button
                        _dark={darkNeutralButton}
                        class="w-full"
                        as={Link}
                        href="/users"
                    >
                        <Text message="a_back" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default UserForm;
