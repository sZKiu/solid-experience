import { notificationService } from '@hope-ui/solid';
import { useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import Title from '../../../atoms/Title';
import { permissions } from '../../../config/permissions';
import { PermissionApi } from '../../auth/interfaces/permission';
import { RoleApi } from '../../role/interfaces';
import createAlert from '../../shared/hooks/createAlert';
import AlertErrors from '../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../shared/templates/GeneralLoader';
import { UserApi, UserPayload, UserResponse } from '../interfaces';
import UserForm from '../organisms/UserForm';

interface UserCreateTemplateProps {
    permissionsList?: PermissionApi[];
    rolesList?: RoleApi[];
    onUpdate: ( data: UserPayload ) => Promise<UserResponse>;
    loading: boolean;
    userSelected?: UserApi | undefined;
}

const UserUpdate: Component<UserCreateTemplateProps> = props =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'u_updated' ) as string,
        } );
        navigate( '/users', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_user' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="px-4">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_user"
            />

            <section class="flex flex-row justify-between items-center my-6">
                <Title class="dg-section-title" titleType="h1">
                    <Text message="u_update" />
                </Title>
            </section>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <UserForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    userPermission={{ submit: permissions.USERS.UPDATE }}
                    rolesList={props.rolesList}
                    userSelected={props.userSelected}
                />
            </Show>

        </section>
    );
};

export default UserUpdate;
