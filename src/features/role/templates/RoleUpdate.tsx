import { Label } from '@digichanges/solid-components';
import { Link } from 'solid-app-router';
import { Component, createMemo, Show } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';
import Title from '../../../atoms/Title';
import { states } from '../../../entities';
import { IPermissionApi } from '../../auth/interfaces';
import MultiSelect from '../../shared/molecules/MultiSelect';
import SingleSelect from '../../shared/molecules/SingleSelect';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { SelectTransform } from '../../shared/utils/SelectTransform';
import { IRoleApi } from '../interfaces';
import RoleSchema from '../validations/schemas/RoleSchema';
import { Text, useI18n } from 'solid-i18n';

interface RoleUpdateTemplateProps
{
    permissionsList?: IPermissionApi[];
    updateAction: ( data: any ) => void;
    roleSelected: IRoleApi | undefined;
    idSelected: string;
    loading: boolean;
}

const singleSelectStyle = {
    searchBox: { 'max-height': '40px' },
    inputField: { 'max-height': '40px', 'padding': '0 10px' },
};

const RoleUpdate: Component<RoleUpdateTemplateProps> =  ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const groupedPermissions = createMemo( () => SelectTransform.getPermissionsGroupedToSelectArray( props?.permissionsList ) );

    const roleCurrentPermissions = createMemo( () => SelectTransform.getOptionsSimpleArray( props.roleSelected?.permissions ) );

    return (
        <section class="px-4">
            <div class="mb-2">
                <Title class="text-3xl font-bold" titleType="h1">
                    <Text message="r_update" />
                </Title>
            </div>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>

                <Form
                    initialValues={{
                        name: props.roleSelected?.name,
                        slug: props.roleSelected?.slug,
                        permissions: roleCurrentPermissions(),
                        enable: { ...states.find( enableOption => enableOption.value === props.roleSelected?.enable ) },
                    }}
                    validation={RoleSchema( t )}
                    onSubmit={async ( form ) =>
                    {
                        props.updateAction( form.values );
                    }}

                >
                    <div class="flex flex-wrap text-sm">
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="name"
                                type="text"
                                id="name"
                                class="dg-form-field-full"
                                placeholder={t( 'a_enter_name' )}
                                labelClass="text-main-gray-200 block mb-2"
                                labelName={t( 'name' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Input
                                name="slug"
                                type="text"
                                id="slug"
                                class="dg-form-field-full"
                                placeholder={t( 'a_enter_slug' )}
                                labelClass="text-main-gray-200 block mb-2"
                                labelName={t( 'slug' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-full-field-wrapper">
                            <Label for="permissions"><Text message="permissions" /></Label>
                            <MultiSelect
                                name="permissions"
                                options={groupedPermissions()}
                                isObject
                                displayValue="value"
                                groupBy='group'
                                id="permissions"
                                placeholder={t( 'a_enter_permissions' )}
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="dg-form-quarter-field-wrapper">
                            <Label for="enable" class="dg-form-label">
                                <Text message="enable" />
                            </Label>
                            <SingleSelect
                                id="enable"
                                name="enable"
                                options={states}
                                isObject
                                displayValue="label"
                                style={singleSelectStyle}
                                placeholder="Type"
                                errorClass="ml-1"
                            />
                        </div>
                        <div class="w-full mt-5 flex justify-end">

                            <Link href='/roles' class="px-10 py-2 items-center dg-secondary-button">
                                <Text message='a_close' />
                            </Link>

                            <Button class="px-10 py-2 items-center dg-secondary-button" type="submit">
                                <Text message='a_save'/>

                            </Button>
                        </div>
                    </div>
                </Form>
            </Show>
        </section>
    );
};
export default RoleUpdate;
