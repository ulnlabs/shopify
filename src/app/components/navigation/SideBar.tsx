'use client'
import React, { ReactNode, useEffect, useRef } from 'react'
import { motion, useCycle } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button, ConfigProvider, Menu } from 'antd';
import { navItems } from './Type'
function SideBar() {
  return (
    <div className='w-[400px]'>
      <ConfigProvider
        theme={{
          components: {
            Menu:{
              
            }
          }
        }}
      >
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          style={{ height: '100%' }}

          items={navItems}
        />
      </ConfigProvider>
    </div>
  )
}

export default SideBar
