import React, { ContextType, useContext, useEffect, useState } from "react";
import { TokenListContext } from "../../context/TokenList";
import { TransactionContext } from "../../context/Transaction";
import { ListToken } from "../../utils";
import axios from "axios";
import DisplayBalance from "../DisplayBalance";
import { useAccount } from "wagmi";

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
  const { token, setToken, fetchTokenData, apiKey } =
    React.useContext(TokenListContext);
  const {
    tokenTwo,
    setTokenTwo,
    tokenOne,
    setTokenOne,
    stateTransaction,
    setStateTransaction,
    setMaxTokenOne,
    setMaxTokenTwo,
  } = useContext(TransactionContext);
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
  const { address } = useAccount();
  const fetchDataNull = async () => {
    console.log("itung1");
    setLoading(true);
    const responseListToken = await ListToken.get("").then((res) => {
      setListToken(res.data.tokens);
      return res.data.tokens;
    });
    setLoading(false);
  };
  const fetchData = async (address: String | undefined, apiKey: String) => {
    console.log("itung");
    setLoading(true);
    const responseListToken = await ListToken.get("").then((res) => {
      setListToken(res.data.tokens);
      return res.data.tokens;
    });
    if (address !== undefined) {
      const options = {
        method: "POST",
        url: `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenBalances",
          params: [address],
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
      console.log();
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
    }

    setListWalletWithTokenBalance(responseListToken);
    // Get balance of token
    setLoading(false);
  };
  const TokenOneString = "tokenOne";
  const openModal = async () => {
    setLoading(true);
    await fetchData(address, apiKey);
    setLoading(false);
    setShowModal(true);
  };
  useEffect(() => {
    if (showModal === true) {
      openModal();
    }
  }, [address]);
  const selectToken = (type: any, token: any, balance: Number) => {
    if (type.type.type === TokenOneString) {
      if (balance !== undefined) {
        setTokenOne(token);
        setShowModal(false);
        setMaxTokenOne(balance);
      } else {
        setTokenOne(token);
        setShowModal(false);
        setMaxTokenOne(0);
      }
    }
    if (type.type.type === "tokenTwo") {
      if (balance !== undefined) {
        setTokenTwo(token);
        setShowModal(false);
        setMaxTokenTwo(balance);
      } else {
        setTokenOne(token);
        setShowModal(false);
        setMaxTokenOne(0);
      }
    }
  };

  return (
    <div className="">
      <div
        onClick={openModal}
        className="flex flex-row w-full h-full min-h-[25px] rounded-md hover:bg-slate-50 cursor-pointer"
      >
        <div className="flex items-center justify-center ">
          {loading ? (
            <div role="status">
              <svg
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="p-1 flex items-center ">
              <img
                src={
                  type.type.type === TokenOneString
                    ? tokenOne.logoURI
                    : tokenTwo.logoURI
                }
              ></img>
            </div>
          )}
        </div>

        <div className="p-1 flex items-center">
          <p className="font-mono font-bold">
            {type.type.type === TokenOneString
              ? tokenOne.symbol
              : tokenTwo.symbol}
          </p>
        </div>
      </div>
      {loading ? (
        <p></p>
      ) : (
        showModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
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

                      {loading ? (
                        <p>loading</p>
                      ) : (
                        listWalletWithTokenBalance.map(
                          (token: any, key: any) => {
                            return (
                              <div
                                key={key}
                                className="flex flex-row py-3 pl-2  rounded hover:bg-slate-200"
                                onClick={() =>
                                  selectToken(type, token, token.balance)
                                }
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
                          }
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SelectModal;
