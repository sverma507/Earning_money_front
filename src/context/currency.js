import { useState, useContext, useEffect, createContext } from "react";

const CurrencyContext = createContext();

const CurrencyAuthProvider = ({ children }) => {
    const [currencyAuth, setCurrencyAuth] = useState('INR');

    useEffect(() => {
        const storedCurrency = localStorage.getItem('currency');
        if (storedCurrency) {
            setCurrencyAuth(storedCurrency);
        } else {
            setCurrencyAuth('INR');
        }
    }, []); // Dependency array added to ensure useEffect runs only once on mount

    return (
        <CurrencyContext.Provider value={[ currencyAuth, setCurrencyAuth ]}>
            {children}
        </CurrencyContext.Provider>
    );
};

const useCurrencyAuth = () => useContext(CurrencyContext);

export { useCurrencyAuth, CurrencyAuthProvider };
