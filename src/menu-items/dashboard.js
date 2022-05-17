// assets
import { IconHome } from '@tabler/icons';

// constant
const icons = { IconHome };
const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconHome,
            breadcrumbs: false,
            privateRouteUser : true,
            privateRouteAdmin : true
        }
    ]
};

export default dashboard;
