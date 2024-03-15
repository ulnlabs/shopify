import { FaDolly, FaFileImport, FaHome, FaUserPlus } from 'react-icons/fa';
import React from 'react'
import { FaShop, FaShopify, FaUsers } from 'react-icons/fa6'
import { AiOutlineShop } from 'react-icons/ai'
import { IoReceiptOutline } from 'react-icons/io5';
import { GiExpense, GiNewspaper } from 'react-icons/gi';
import { TiUser } from 'react-icons/ti';
import { IoIosSettings } from 'react-icons/io';
export type NavBarItem = {
    label: string;
    icon?: JSX.Element;
    key?: string;
    children?: NavBarItem[];
};
export const navItems: NavBarItem[] = [
    {
        label: "Dashboard",
        icon: <AiOutlineShop />,
        key: "/dashboard",
    },
    {
        label: "Sales",
        icon: <FaDolly />,
        key: "",
        children: [
            {
                label: "POS",
                key: "/sales/pos",
            },
            {
                label: "New Sale",
                key: "/sales/new-sale",
            },
            {
                label: "Sales List",
                key: "/sales/list",
            },
            {
                label: "New Sales Return",
                key: "/sales/new-return",
            },
            {
                label: "Sales Returns List",
                key: "/sales/return-list",
            },


        ],
    },
    {
        label: "Customers",
        icon: <FaUsers />,
        key: "/customers",
        children: [
            {
                label: "New Customer",
                key: "/customers/new",
            },
            {
                label: "Customers List",
                key: "/customers/list",
            },
            {
                label: "Import Customers",
                key: "/customers/import",
            },
        ]
    }, {
        label: 'purchases',
        icon: <FaShopify />,
        key: "/purchases",
        children: [
            {
                label: 'New Purchase',
                key: "/purchases/new"
            },
            {
                label: 'Purchases List',
                key: "/purchases/list"
            },
            {
                label: 'New Purchase Return',
                key: "/purchases/return-new"
            },
            {
                label: 'Purchase Returns List',
                key: "/purchases/return-list"
            },
        ]
    }, {
        label: 'Suppliers',
        icon: <FaShop />,
        key: "/suppliers",
        children: [
            {
                label: 'New Supplier',
                key: "/suppliers/new"
            },
            {
                label: 'Suppliers List',
                key: "/suppliers/list"
            },
            {
                label: ' Import Suppliers',
                key: "/suppliers/import"
            }
        ]
    }, {
        label: 'Items',
        icon: <IoReceiptOutline />,
        key: "/items",
        children: [
            {
                label: 'New Item',
                key: "/items/new"
            },
            {
                label: 'Items List',
                key: "/items/list"
            },
            {
                label: 'New Category',
                key: "/items/new/category"
            },
            {
                label: 'Categories List',
                key: "/items/categories"
            },
            {
                label: 'New Brand',
                key: "/items/new/brand"
            },
            {
                label: 'Brands List',
                key: "/items/brands"
            },
            {
                label: 'Print Labels',
                key: "/items/labels"
            },
            {
                label: 'Import Items',
                key: "/items/import"
            }
        ]
    }, {
        label: 'expenses',
        icon: <GiExpense />,
        key: "/expenses",
        children: [
            {
                label: 'New Expense',
                key: "/expenses/new"
            },
            {
                label: 'Expenses List',
                key: "/expenses/list"
            },
            {
                label: 'New Category',
                key: "/expenses/new/category"
            },
            {
                label: 'Categories List',
                key: "/expenses/categories"
            },
        ]
    }, {
        label: 'reports',
        icon: <GiNewspaper />,
        key: "/reports",
        children: [
            {
                label: 'Profit & Loss Report',
                key: "/reports/profit-loss"
            },
            {
                label: 'Purchase Report',
                key: "/reports/purchase"
            },
            {
                label: 'Purchase Return Report',
                key: "/reports/purchase-return"
            },
            {
                label: 'Purchase Payments Report',
                key: "/reports/purchase-payments"
            },
            {
                label: 'Item Sales Report',
                key: "/reports/item-sales"
            },
            {
                label: 'Item Purchase Report',
                key: "/reports/item-purchase"
            },
            {
                label: 'Sales Report',
                key: "/reports/sales"
            },
            {
                label: 'Sales Return Report',
                key: "/reports/sales-return"
            },
            {
                label: 'Sales Payments Report',
                key: "/reports/sales-payments"
            },
            {
                label: 'Stock Report',
                key: "/reports/stock"
            },
            {
                label: 'Expense Report',
                key: "/reports/expense"
            },
            {
                label: 'Expired Items Report',
                key: "/reports/expired-items"
            },
        ]
    }, {
        label: 'Users',
        icon: <TiUser />,
        key: "/users",
        children: [
            {
                label: 'New User',
                key: "/users/new"
            },
            {
                label: 'Users List',
                key: "/users/list"
            }, {
                label: 'role list',
                key: "/users/roles"
            }
        ]
    }, {
        label: 'Settings',
        icon: <IoIosSettings />,
        key: "/settings",
        children: [
            { label: 'Company Profile', key: "/settings/company" },
            { label: 'Site Settings', key: "/settings/sitelist" },
            { label: 'Tax List', key: "/settings/taxlists" },
            { label: 'Units List', key: "/settings/units-list" },
            { label: 'Payment Types List', key: "/settings/payment-types-list" },
            { label: 'Currency List', key: "/settings/currencylist" },
            { label: 'Change Password', key: "/settings/change-password" },
            { label: 'Database Backup', key: "/settings/database-backup" },
        ]
    }
]

export type NavItemProps = {
    item: NavBarItem
    isToggle: () => void
}