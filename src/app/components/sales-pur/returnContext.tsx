import React, { createContext, useContext, useState } from 'react';

const ReturnContext = createContext<any>({});

export const ReturnProvider = ({ children }: any) => {
    const [parameter, setParameter] = useState<any>([]);

    return (
        <ReturnContext.Provider value={{ parameter, setParameter }}>
            {children}
        </ReturnContext.Provider>
    );
};

export const useReturn = () => useContext(ReturnContext);
