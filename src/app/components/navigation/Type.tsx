import { FaDolly, FaHome } from 'react-icons/fa';
import React from 'react'
import { FaUsers } from 'react-icons/fa6'
import type { MenuProps } from 'antd';
export type MenuItem = Required<MenuProps>['items'][number];

export type NavBarItem = {
    label: string;
    icon: JSX.Element;
    key: string;
    children?: NavBarItem[];
};


export const navItems: NavBarItem[] = [
    {
        label: "Dashboard",
        icon: <FaHome />,
        key: "/",
    },
    {
        label: "Sales",
        icon: <FaDolly />,
        key: "/sales",
        children: [
            {
                label: "POS",
                icon: <FaDolly />,
                key: "/sales/pos",
            },
            {
                label: "New Sale",
                icon: <FaDolly />,
                key: "/sales/new-sale",
            },

        ],
    },
    {
        label: "Customers",
        icon: <FaUsers />,
        key: "/customers",
        children: [
            {
                label: "Customers",
                icon: <FaUsers />,
                key: "/customers",
            },
        ]
    },
]

export type NavItemProps = {
    item: NavBarItem
    isOpened: ()=>void
}