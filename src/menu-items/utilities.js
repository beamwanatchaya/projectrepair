import { IconFile, IconHistory, IconChartDots, IconUser } from '@tabler/icons';

const icons = {
    IconFile,
    IconHistory,
    IconChartDots,
    IconUser
};

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Repair form',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.IconFile,
            breadcrumbs: false,
            privateRouteUser : true,
            privateRouteAdmin : false
        },
        {
            id: 'util-shadow',
            title: 'statistics',
            type: 'item',
            url: '/utils/util-shadow',
            icon: icons.IconChartDots,
            breadcrumbs: false,
            privateRouteUser : true,
            privateRouteAdmin : true
        },
        {
            id: 'history',
            title: 'History',
            type: 'item',
            url: '/history',
            icon: icons.IconHistory,
            breadcrumbs: false,
            privateRouteUser : true,
            privateRouteAdmin : true
        },
        {
            id: 'genuser',
            title: 'Genuser',
            type: 'item',
            url: '/genuser',
            icon: icons.IconUser,
            breadcrumbs: false,
            privateRouteUser : false,
            privateRouteAdmin : true
        }
      
    ]
};

export default utilities;
