import { Value } from '@radix-ui/react-select';
import React, { createContext, useContext, useState } from 'react';

const ReturnContext = createContext<any>({});

export const returnProvider = ({ children }: any) => {

    const [parameter, setParameter] = useState<any>(null);

    return (
        <ReturnContext.Provider value={{ parameter, setParameter }}>
            {children}
        </ReturnContext.Provider>
    )

};

export const useReturn = () => useContext(ReturnContext);
