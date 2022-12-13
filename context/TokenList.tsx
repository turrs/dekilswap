import React, { createContext, useContext, ReactNode, useState } from "react";
import { ListToken } from "../utils";

export const TokenListContext = createContext<any>({});

type TokenListProps = {
  children?: ReactNode;
};

export const TokenListProvider = ({ children }: TokenListProps) => {
  const [token, setToken] = React.useState(3);
  const fetchTokenData = async () => {
    const response = ListToken.get("").then((res) => {
      setToken(res.data);
    });
  };
  return (
    <TokenListContext.Provider value={{ token, setToken, fetchTokenData }}>
      {children}
    </TokenListContext.Provider>
  );
};
