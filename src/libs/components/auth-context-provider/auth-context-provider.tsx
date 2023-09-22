import { createContext, PropsWithChildren, useState } from 'react';
import {Outlet} from "react-router-dom";

const AuthContext = createContext<{
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);


type Properties = PropsWithChildren;

const AuthContextProvider: React.FC<Properties> = ({children}) => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
