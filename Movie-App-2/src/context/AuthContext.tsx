import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  id:any;
  setId:(id:any)=>void;
  user: any;
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [id,setId] = useState<any>(null)

  return (
    <AuthContext.Provider value={{ user, setUser, id,setId }}>
      {children}
    </AuthContext.Provider>
  );
};
