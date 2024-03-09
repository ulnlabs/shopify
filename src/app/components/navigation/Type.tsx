import { FaDolly, FaHome } from 'react-icons/fa';
import React from 'react'
import { FaUsers } from 'react-icons/fa6'
import type { MenuProps } from 'antd';
export type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export const navItems: MenuItem[] = [
    getItem('Dashboard', '/', <FaHome />),
    getItem('Sales', '#sale', <FaDolly /> , [
        getItem('POS', '/pos'),
        getItem('New Sale', '/new-sale'),
        getItem('Sale List', '/sales-list'),
        getItem('New Sale Return', '/new-sale-return'),
        getItem('Sale Return List', '/sale-return-list'),
    ]),
    getItem('Customers', '#customer', <FaUsers /> , [
        getItem('New Customer', '/new-customer'),
        getItem('Customer List', '/customer-list'),
        getItem('Import Customers', '/import-customers'),
    ]),
    getItem('Purchase', '#purchase', <FaDolly /> , [
        getItem('New Purchase', '/new-purchase'),
        getItem('Purchase List', '/purchase-list'),
        getItem('New Purchase Return', '/new-purchase-return'),
        getItem('Purchase Return List', '/purchase-return-list'),
    ]),
    getItem('Suppliers', '#supplier', <FaUsers /> , [
        getItem('New Supplier', '/new-supplier'),
        getItem('Supplier List', '/supplier-list'),
        getItem('Import Suppliers', '/import-suppliers'),
    ]),
    getItem('Items', '#item', <FaUsers /> , [
        getItem('New Item', '/new-item'),
        getItem('Item List', '/item-list'),
        getItem('new Category', '/new-category'),
        getItem('Category List', '/category-list'),
        getItem('new Brand', '/new-brand'),
        getItem('Brand List', '/brand-list'),
        getItem('import Items', '/import-items')
    ]),
    getItem('Expences', '#expence', <FaUsers /> , [
        getItem('New Expence', '/new-expence'),
        getItem('Expence List', '/expence-list'),
        getItem('Expence Category', '/expence-category'),
        getItem('Expence Category List', '/expence-category-list'),
    ]),
    getItem('reports', '#report', <FaUsers /> , [
        getItem('profit & loss', '/profit-loss'),
        getItem('purchase report', '/purchase-report'),
        getItem('purchase return report', '/purchase-return-report'),
        getItem('purchase payment report', '/purchase-payment-report'),
        getItem('item sale report', '/item-sale-report'),
        getItem('item purchase report', '/item-purchase-report'),
        getItem('sale report', '/sale-report'),
        getItem('sale return report', '/sale-return-report'),
        getItem('sale payment report', '/sale-payment-report'),
        getItem('stock report', '/stock-report'),
        getItem('expence report', '/expence-report'),
        getItem('expiry report', '/expiry-report')
    ]),
    getItem('Users', '#user', <FaUsers /> , [
        getItem('New User', '/new-user'),
        getItem('User List', '/user-list'),
        getItem('role list', '/role-list'),
    ]),
    getItem('Settings', '#setting', <FaUsers /> , [
        getItem('company profile', '/company-profile'),
        getItem('site setting', '/site-setting'),
        getItem('tax list', '/tax-list'),
        getItem('unit list', '/unit-list'),
        getItem('payment method list', '/payment-method-list'),
        getItem('currency list', '/currency-list'),
        getItem('change password', '/change-password'),
        getItem('backup database', '/backup-database'),

    ]),
]