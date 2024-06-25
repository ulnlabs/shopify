"use client";
import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext<any>({});

export const UserProvider: any = ({ children }: { children: any }) => {
  const [toggleNav, setToggleNav] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<boolean>(true);
const [isChanged, setIsChanged] = useState<boolean>(false)
  return (
    <UserContext.Provider
      value={{ toggleNav, setToggleNav, isOpen, setIsOpen,isChanged,setIsChanged }}
    >
      {children}
    </UserContext.Provider>
  );
};
