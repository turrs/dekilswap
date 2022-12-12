import React, { createContext, useContext, ReactNode, useState } from "react";

type TransactionContextType = {
  Quote: any;
};

export const TransactionContext = createContext<TransactionContextType | null>(
  null
);

export const useTransactionContext = () => useContext(TransactionContext);

type TransactionProps = {
  children?: ReactNode;
};
type QuoteType = {
  Quote: Array<String>;
};
const Transaction = {
  Quote: [],
};
export const TransactionProvider = ({ children }: TransactionProps) => {
  const [props, setProps] = useState<TransactionProps | any>(Transaction);
  return (
    <TransactionContext.Provider value={{ Quote: props }}>
      {children}
    </TransactionContext.Provider>
  );
};
