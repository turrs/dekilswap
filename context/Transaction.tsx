import React, { createContext, useContext, ReactNode, useState } from "react";
import { ListToken } from "../utils";

export const TransactionContext = createContext<any>({});

type TransactionProps = {
  children?: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProps) => {
  const [tokenOne, setTokenOne] = useState<any>({
    chainI: 137,
    name: "Matic Token",
    symbol: "MATIC",
    decimals: 18,
    address: "0x0000000000000000000000000000000000001010",
    logoURI: "https://wallet-asset.matic.network/img/tokens/matic.svg",
    tags: ["plasma", "erc20", "swapable"],
    extensions: {
      rootAddress: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    },
  });
  const [tokenTwo, setTokenTwo] = useState<any>({
    chainId: 137,
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    logoURI: "https://wallet-asset.matic.network/img/tokens/usdc.svg",
    tags: ["pos", "stablecoin", "erc20", "metaTx", "swapable"],
    extensions: {
      rootAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
  });
  return (
    <TransactionContext.Provider
      value={{ tokenOne, setTokenOne, tokenTwo, setTokenTwo }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
