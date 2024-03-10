import { FaDolly, FaFileImport, FaHome, FaUserPlus } from 'react-icons/fa';
import React from 'react'
import { FaShop, FaShopify, FaUsers } from 'react-icons/fa6'
import { AiOutlineShop } from 'react-icons/ai'
import { IoReceiptOutline } from 'react-icons/io5';
import { GiExpense } from 'react-icons/gi';
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
                key: "/dashboard/sales/pos",
            },
            {
                label: "New Sale",
                key: "/dashboard/sales/new-sale",
            },
            {
                label: "Sales List",
                key: "/dashboard/sales/list",
            },
            {
                label: "New Sales Return",
                key: "/dashboard/sales/new-return",
            },
            {
                label: "Sales Returns List",
                key: "/dashboard/sales/return-list",
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
                key: "/dashboard/customer/addcustomer",
            },
            {
                label: "Customers List",
                key: "/dashboard/customers/list",
            },
            {
                label: "Import Customers",
                key: "/dashboard/customers/import",
            },
        ]
    }, {
        label: 'purchases',
        icon: <FaShopify />,
        key: "/purchases",
        children: [
            {
                label: 'New Purchase',
                key: "/dashboard/purchases/new"
            },
            {
                label: 'Purchases List',
                key: "/dashboard/purchases/list"
            },
            {
                label: 'New Purchase Return',
                key: "/dashboard/purchases/return-new"
            },
            {
                label: 'Purchase Returns List',
                key: "/dashboard/purchases/return-list"
            },
        ]
    }, {
        label: 'Suppliers',
        icon: <FaShop />,
        key: "/suppliers",
        children: [
            {
                label: 'New Supplier',
                key: "/dashboard/suppliers/new"
            },
            {
                label: 'Suppliers List',
                key: "/dashboard/suppliers/list"
            },
            {
                label: ' Import Suppliers',
                key: "/dashboard/suppliers/import"
            }
        ]
    }, {
        label: 'Items',
        icon: <IoReceiptOutline />,
        key: "/items",
        children: [
            {
                label: 'New Item',
                key: "/dashboard/items/new"
            },
            {
                label: 'Items List',
                key: "/dashboard/items/list"
            },
            {
                label: 'New Category',
                key: "/dashboard/items/new/category"
            },
            {
                label: 'Categories List',
                key: "/dashboard/items/categories"
            },
            {
                label: 'New Brand',
                key: "/dashboard/items/new/brand"
            },
            {
                label: 'Brands List',
                key: "/dashboard/items/brands"
            },
            {
                label: 'Print Labels',
                key: "/dashboard/items/labels"
            },
            {
                label: 'Import Items',
                key: "/dashboard/items/import"
            }
        ]
    }, {
        label: 'expenses',
        icon: <GiExpense />,
        key: "/expenses",
        children: [
            {
                label: 'New Expense',
                key: "/dashboard/expenses/new"
            },
            {
                label: 'Expenses List',
                key: "/dashboard/expenses/list"
            },
            {
                label: 'New Category',
                key: "/dashboard/expenses/new/category"
            },
            {
                label: 'Categories List',
                key: "/dashboard/expenses/categories"
            },
        ]
    }, {
        label: 'reports',
        icon: <FaHome />,
        key: "/reports",
        children: [
            {
                label: 'Profit & Loss Report',
                key: "/dashboard/reports/profit-loss"
            },
            {
                label: 'Purchase Report',
                key: "/dashboard/reports/purchase"
            },
            {
                label: 'Purchase Return Report',
                key: "/dashboard/reports/purchase-return"
            },
            {
                label: 'Purchase Payments Report',
                key: "/dashboard/reports/purchase-payments"
            },
            {
                label: 'Item Sales Report',
                key: "/dashboard/reports/item-sales"
            },
            {
                label: 'Item Purchase Report',
                key: "/dashboard/reports/item-purchase"
            },
            {
                label: 'Sales Report',
                key: "/dashboard/reports/sales"
            },
            {
                label: 'Sales Return Report',
                key: "/dashboard/reports/sales-return"
            },
            {
                label: 'Sales Payments Report',
                key: "/dashboard/reports/sales-payments"
            },
            {
                label: 'Stock Report',
                key: "/dashboard/reports/stock"
            },
            {
                label: 'Expense Report',
                key: "/dashboard/reports/expense"
            },
            {
                label: 'Expired Items Report',
                key: "/dashboard/reports/expired-items"
            },
        ]
    }, {
        label: 'Users',
        icon: <FaHome />,
        key: "/users",
        children: [
            {
                label: 'New User',
                key: "/dashboard/users/new"
            },
            {
                label: 'Users List',
                key: "/dashboard/users/list"
            }, {
                label: 'role list',
                key: "/dashboard/users/roles"
            }
        ]
    }, {
        label: 'Settings',
        icon: <FaHome />,
        key: "/settings",
        children: [
            { label: 'Company Profile', key: "/dashboard/settings/company-profile" },
            { label: 'Site Settings', key: "/dashboard/settings/site-settings" },
            { label: 'Tax List', key: "/dashboard/settings/tax-list" },
            { label: 'Units List', key: "/dashboard/settings/units-list" },
            { label: 'Payment Types List', key: "/dashboard/settings/payment-types-list" },
            { label: 'Currency List', key: "/dashboard/settings/currency-list" },
            { label: 'Change Password', key: "/dashboard/settings/change-password" },
            { label: 'Database Backup', key: "/dashboard/settings/database-backup" },
        ]
    }
]

export type NavItemProps = {
    item: NavBarItem
    isToggle: () => void
}