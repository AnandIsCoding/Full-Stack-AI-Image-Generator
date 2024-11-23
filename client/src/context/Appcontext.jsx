import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const Appcontext = createContext();

const AppcontextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowauth] = useState(false);
  const [totalCredits, setTotalCredits] = useState(null);
  const [loggedInuser, setLoggedinuser] = useState('')
  const [appToken, setAppToken] = useState('')

 

  const value = {
    isLoggedIn, setIsLoggedIn,
    showAuth, setShowauth,
    totalCredits, setTotalCredits,loggedInuser, setLoggedinuser, appToken, setAppToken
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};

export default AppcontextProvider;
