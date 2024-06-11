// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const uid = useSelector(state => state.auth.uid); 

    useEffect(() => {
        setIsLoading(true);
        if (uid) {
            fetch(`http://localhost:3001/get-persona/${uid}`)
                .then(response => response.json())
                .then(data => {
                    setUserData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setUserData({}); 
                    setIsLoading(false);
                });
        } else {
            setUserData({}); 
            setIsLoading(false);
        }
    }, [uid]);

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};


