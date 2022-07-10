import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


const Edit = Loadable(lazy(() => import('views/edit')));
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const Genuser = Loadable(lazy(() => import('views/genuser')));
const History = Loadable(lazy(() => import('views/history')));
const Resetpassword = Loadable(lazy(() => import('views/resetpassword')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
        },
        {
            path: '/dashboard',
            element: <DashboardDefault />,
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />,
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />,
        },
        {
            path: '/history',
            element: <History />,
        },
        {
            path: '/edit',
            element: <Edit />,
        },
        {
            path: '/genuser',
            element: <Genuser />,
        },
        {
            path: '/resetpassword',
            element: <Resetpassword />,
        }
    ]
};

export default MainRoutes;
