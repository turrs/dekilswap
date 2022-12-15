import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TransactionContext } from "../../context/Transaction";
import FixSwap from "../FixSwap";
import { getAmountTokenSell, getPrice, getQuote } from "../FunctionAPI";
import SelectToken from "../SelectToken";

type DexSwapProps = {};

const DexSwap = (props: DexSwapProps) => {
  const [loading, setLoading] = useState<DexSwapProps | false>(false);
  const [fixSwapContent, setFixSwapContent] = useState<DexSwapProps | false>(
    false
  );
  const { openConnectModal } = useConnectModal();
  const {
    tokenAmountOne,
    tokenAmountTwo,
    tokenOne,
    tokenTwo,
    setTokenAmountTwo,
    setTokenOne,
    setTokenTwo,
    maxTokenOne,
  } = useContext(TransactionContext);
  const { address } = useAccount();
  const ReviewSwap = async (
    tokenOne: any,
    tokenTwo: any,
    tokenAmountOne: any,
    address: any,
    maxTokenOne: Number
  ) => {
    setLoading(true);
    if (tokenAmountOne < maxTokenOne) {
      await getQuote(tokenOne, tokenTwo, tokenAmountOne, address);
    } else {
      alert("balance not cukup");
    }
    setLoading(false);
    setFixSwapContent(true);
  };
  const SwapToken = () => {
    setLoading(true);

    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setLoading(false);
    }, 3000);
  };
  const getAmount = async (
    tokenOne: any,
    tokenTwo: any,
    tokenAmountOne: any
  ) => {
    const amountTokenSell = await getAmountTokenSell(
      tokenOne,
      tokenTwo,
      tokenAmountOne
    ).then((res) => {
      console.log("kokaa", res);
      setTokenAmountTwo(res);
      setLoading(false);
    });
  };
  const handleChangeToken = (tokenOne: Object, tokenTwo: Object) => {
    const temp = tokenOne;
    setTokenOne(tokenTwo);
    setTokenTwo(temp);
  };
  useEffect(() => {
    console.log("changeee", tokenOne);

    getAmount(tokenOne, tokenTwo, tokenAmountOne);
  }, [tokenOne, tokenTwo, tokenAmountOne, loading]);
  return (
    <div className="flex items-center pt-10 flex-col">
      <div className="flex rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-96 h-full max-h-full">
        <div className="p-8 w-full h-full">
          {loading ? (
            <>
              <div className="flex justify-center items-center w-full h-full">
                <p className="font-mono font-bold">loading . . .</p>
                <div className=" p-4 ">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 animate-ping"></span>
                </div>
              </div>
            </>
          ) : (
            <>
              {!fixSwapContent && (
                <div>
                  <SelectToken type="tokenOne" />
                  <div className="flex justify-center  items-center py-2  ">
                    <div
                      className="hover:bg-slate-100 rounded-sm cursor-pointer"
                      onClick={() => handleChangeToken(tokenOne, tokenTwo)}
                    >
                      <i className="ri-arrow-up-down-line flex justify-center items-center p-1 "></i>
                    </div>
                  </div>
                  <SelectToken type="tokenTwo" />
                </div>
              )}
            </>
          )}
          {fixSwapContent && !loading ? <FixSwap /> : null}
        </div>
      </div>
      <div className="py-5 w-full">
        {!loading && !openConnectModal && !fixSwapContent ? (
          <button
            disabled={tokenAmountOne > maxTokenOne ? true : false}
            onClick={() =>
              ReviewSwap(
                tokenOne,
                tokenTwo,
                tokenAmountOne,
                address,
                maxTokenOne
              )
            }
            className={`flex items-center ${
              tokenAmountOne > maxTokenOne ? "bg-slate-300" : "bg-blue-500 "
            } w-full justify-center rounded-xl border-4 border-black hover:cursor-pointer px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50`}
          >
            <div>
              <p className="font-mono font-bold text-white">Review Swap</p>
            </div>
          </button>
        ) : null}
        {!loading && !openConnectModal && fixSwapContent ? (
          <div
            onClick={SwapToken}
            className="flex items-center justify-center rounded-xl border-4 border-black bg-blue-500 hover:cursor-pointer px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"
          >
            <p className="font-mono font-bold text-white">Swap</p>
            <span aria-hidden="true" className="ml-1.5" role="img"></span>
          </div>
        ) : null}
        {openConnectModal && (
          <div
            onClick={openConnectModal}
            className="flex items-center justify-center rounded-xl border-4 border-black bg-blue-500 hover:cursor-pointer px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50"
          >
            <p className="font-mono font-bold text-white">Connect Wallet</p>
            <span aria-hidden="true" className="ml-1.5" role="img"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DexSwap;
