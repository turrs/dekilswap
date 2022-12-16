import React, { createContext, useContext, ReactNode, useState } from 'react';
import { ListToken } from '../utils';

export const TransactionContext = createContext<any>({});

type TransactionProps = {
  children?: ReactNode;
};

export const TransactionProvider = ({ children }: TransactionProps) => {
  const [tokenOne, setTokenOne] = useState<any>({
    chainI: '',
    name: '',
    symbol: '',
    decimals: 18,
    address: '',
    logoURI: '',
    tags: [],
    extensions: {
      rootAddress: '',
    },
  });
  const [maxTokenOne, setMaxTokenOne] = useState<Number>(0);
  const [maxTokenTwo, setMaxTokenTwo] = useState<Number>(0);
  const [tokenAmountOne, setTokenAmountOne] = useState<Number>(0);
  const [tokenAmountTwo, setTokenAmountTwo] = useState<Number>(0);
  const [quote, setQuote] = useState<any>();
  const [tokenTwo, setTokenTwo] = useState<any>({
    chainId: 137,
    name: '',
    symbol: '',
    decimals: '',
    address: '',
    logoURI: '',
    tags: [],
    extensions: {
      rootAddress: '',
    },
  });
  const [stateTransaction, setStateTransaction] = useState<any>({
    tokenOne: {
      chainI: 137,
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
      address: '0x0000000000000000000000000000000000001010',
      logoURI: 'https://wallet-asset.matic.network/img/tokens/matic.svg',
      tags: ['plasma', 'erc20', 'swapable'],
      extensions: {
        rootAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
      },
    },
    tokenTwo: {
      chainI: 137,
      name: 'Matic Token',
      symbol: 'MATIC',
      decimals: 18,
      address: '0x0000000000000000000000000000000000001010',
      logoURI: 'https://wallet-asset.matic.network/img/tokens/matic.svg',
      tags: ['plasma', 'erc20', 'swapable'],
      extensions: {
        rootAddress: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
      },
    },
    walletAdress: '',
    quote: '',
    price: '',
  });
  return (
    <TransactionContext.Provider
      value={{
        tokenOne,
        setTokenOne,
        tokenTwo,
        setTokenTwo,
        stateTransaction,
        setStateTransaction,
        tokenAmountTwo,
        setTokenAmountTwo,
        tokenAmountOne,
        setTokenAmountOne,
        maxTokenTwo,
        setMaxTokenTwo,
        maxTokenOne,
        setMaxTokenOne,
        quote,
        setQuote,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
