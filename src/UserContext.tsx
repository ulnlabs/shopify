"use client"
import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext<any>({})

export const UserProvider: any = ({ children }: { children: any }) => {
    const [toggleNav, setToggleNav] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{ toggleNav, setToggleNav }}>
            {children}
        </UserContext.Provider>
    );
};
