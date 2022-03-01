import Dashboard from '../../templates/dashboard/index';
import { Component } from 'solid-js';
import PrivateLayout from '../../features/shared/layout/PrivateLayout';
const LoginPage: Component = () =>
{
    return (
        <PrivateLayout>
            <Dashboard />
        </PrivateLayout>
    );
};

export default LoginPage;
