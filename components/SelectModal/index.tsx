import React, { ContextType, useContext, useEffect, useState } from "react";
import { TokenListContext } from "../../context/TokenList";
import { TransactionContext } from "../../context/Transaction";
import { ListToken } from "../../utils";
import axios from "axios";
import DisplayBalance from "../DisplayBalance";

type SelectModalProps = {
  type: any;
};

const SelectModal = (type: SelectModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [listToken, setListToken] = useState<any | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [walletTokenBalance, setWalletTokenBalance] = useState<any>([]);
  const [listWalletWithTokenBalance, setListWalletWithTokenBalance] =
    useState<any>([]);
  const { token, setToken, fetchTokenData } =
    React.useContext(TokenListContext);
  const { tokenTwo, setTokenTwo, tokenOne, setTokenOne } =
    useContext(TransactionContext);
  function checkAvailability(arr: any, val: any) {
    return arr.some((arrVal: any) => val === arrVal.address);
  }
  function findObjectToken(arr: any, value: any) {
    if (Array.isArray(arr)) {
      return arr.find((balance) => {
        return balance.contractAddress === value ? 1 : 2;
      });
    }
  }
  const fetchData = async () => {
    setLoading(true);
    const responseListToken = await ListToken.get("").then((res) => {
      setListToken(res.data.tokens);
      return res.data.tokens;
    });

    const options = {
      method: "POST",
      url: "https://polygon-mainnet.g.alchemy.com/v2/YTQiZJGziVyT9G8R1BhEYdhZhdQrgEyV",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: {
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getTokenBalances",
        params: ["0x633CB277E735331aFA40aaEb74F62BA6CbA43c9d"],
      },
    };

    const walletBalance = await axios
      .request(options)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    const nonZeroBalances = await walletBalance.result.tokenBalances.filter(
      (token: any) => {
        return token.tokenBalance !== 0;
      }
    );

    let i = 1;
    let data: any = [];
    for (let token of nonZeroBalances) {
      if (checkAvailability(responseListToken, token.contractAddress)) {
        let balance = token.tokenBalance;

        // options for making a request to get the token metadata
        const options = {
          method: "POST",
          url: "https://polygon-mainnet.g.alchemy.com/v2/YTQiZJGziVyT9G8R1BhEYdhZhdQrgEyV",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: {
            id: 1,
            jsonrpc: "2.0",
            method: "alchemy_getTokenMetadata",
            params: [token.contractAddress],
          },
        };

        // getting the token metadata
        const metadata = await axios.request(options);

        // Compute token balance in human-readable format
        balance = balance / Math.pow(10, metadata["data"]["result"].decimals);
        balance = balance.toFixed(2);

        const dataBalance = {
          contractAddress: token.contractAddress,
          balanceToken: balance,
        };

        const temp = responseListToken;
        data = [...data, dataBalance];
      }

      let tempData = responseListToken;
      data.map((arr: any) => {
        const index = responseListToken.findIndex((object: any) => {
          return object.address === arr.contractAddress;
        });
        tempData[index].balance = arr.balanceToken;
      });
      tempData.sort((a: any, b: any) => b.balance - a.balance);

      setListWalletWithTokenBalance(tempData);
    }

    // Get balance of token
    setLoading(false);
  };
  const TokenOneString = "tokenOne";
  const openModal = () => {
    if (listWalletWithTokenBalance.length === 0) {
      setLoading(true);
      fetchData();
      setShowModal(true);
      setLoading(false);
    }
    setShowModal(true);
  };
  useEffect(() => {
    if (showModal === true && listToken !== null) {
      openModal();
    }
  }, [showModal]);
  const selectToken = (type: any, token: any) => {
    if (type.type.type === TokenOneString) {
      setTokenOne(token);
      setShowModal(false);
    }
    if (type.type.type === "tokenTwo") {
      setTokenTwo(token);
      setShowModal(false);
    }
  };
  useEffect(() => {}, [tokenOne, tokenTwo]);
  return (
    <div>
      <div
        className="flex flex-row  rounded-md hover:bg-slate-50 cursor-pointer"
        onClick={openModal}
      >
        <div className="p-1">
          <img
            src={
              type.type.type === TokenOneString
                ? tokenOne.logoURI
                : tokenTwo.logoURI
            }
          ></img>
        </div>
        <div className="p-1">
          {type.type.type === TokenOneString
            ? tokenOne.symbol
            : tokenTwo.symbol}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex  min-h-screen  -px-2  justify-center py-8">
            <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 sm:flex w-full">
                <div className="mt-2 text-center sm:ml-1 sm:text-left w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between w-full py-2">
                      <div className="bg-slate-100 rounded-sm p-2 w-[40px] h-[40px] flex justify-center items-center">
                        <i className="ri-search-line"></i>
                      </div>
                      <div className="w-full">
                        <input
                          className="w-full h-full px-5 font-mono  outline-0"
                          placeholder="Search token by name "
                        ></input>
                      </div>
                      <div
                        className="bg-slate-100 rounded-sm w-[40px] h-[40px] flex justify-center items-center hover:bg-slate-200 cursor-pointer"
                        onClick={() => setShowModal(false)}
                      >
                        <i className="ri-close-circle-line"></i>
                      </div>
                    </div>

                    {!loading &&
                      listWalletWithTokenBalance.map((token: any, key: any) => {
                        return (
                          <div
                            key={key}
                            className="flex flex-row py-3 pl-2  rounded hover:bg-slate-200"
                            onClick={() => selectToken(type, token)}
                          >
                            <div className=" bg-slate-50 rounded  flex justify-center items-center">
                              <div className="p-2">
                                <img
                                  src={token.logoURI}
                                  width={40}
                                  height={40}
                                ></img>
                              </div>
                            </div>
                            <div className="flex shrink flex-row justify-between w-full items-center">
                              <div className="p-2 w-full">
                                <p className="font-mono font-semibold">
                                  {token.name}
                                </p>
                              </div>
                              <div className="p-2">
                                <p className="font-mono font-semibold">
                                  {token.balance === undefined
                                    ? 0
                                    : token.balance}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectModal;
