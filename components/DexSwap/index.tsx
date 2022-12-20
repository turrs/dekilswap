import { useConnectModal } from '@rainbow-me/rainbowkit';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Web3 from 'web3';
import { TransactionContext } from '../../context/Transaction';
import FixSwap from '../FixSwap';
import {
  getAmountTokenSell,
  getPrice,
  getQuote,
  getQuoteWithoutAdress,
} from '../FunctionAPI';
import { BigNumber } from '@0x/utils';
import SelectToken from '../SelectToken';
import { AbiItem } from 'web3-utils';
import { erc20abi } from '../../utils/Abi';

type DexSwapProps = {};

const DexSwap = (props: DexSwapProps) => {
  const [loading, setLoading] = useState<DexSwapProps | false>(false);
  const [fixSwapContent, setFixSwapContent] = useState<DexSwapProps | false>(
    false,
  );
  const [approveButton, setApproveButton] = useState<DexSwapProps | false>(
    false,
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
    maxTokenTwo,
    setMaxTokenOne,
    setMaxTokenTwo,
    quote,
    setQuote,
    setTokenAmountOne,
  } = useContext(TransactionContext);
  const { address } = useAccount();
  const ReviewSwap = async (
    tokenOne: any,
    tokenTwo: any,
    tokenAmountOne: any,
    address: any,
    maxTokenOne: Number,
  ) => {
    setLoading(true);
    if (tokenAmountOne <= maxTokenOne) {
      const quoteJson = await getQuote(
        tokenOne,
        tokenTwo,
        tokenAmountOne,
        address,
      );
      if (quoteJson === 'need approve') {
        setApproveButton(true);
        setLoading(false);
      } else {
        setQuote(quoteJson);
        setLoading(false);
        setFixSwapContent(true);
      }
    } else {
      alert('balance not cukup');
    }
  };
  const approveToken = async (
    allowanceTarget: any,
    address: any,
    contractTokenOne: any,
  ) => {
    const web3 = new Web3(Web3.givenProvider);

    const ERC20TokenContract = new web3.eth.Contract(
      erc20abi as AbiItem[],
      contractTokenOne,
    );

    const maxApproval = new BigNumber(2).pow(256).minus(1);

    const tx = await ERC20TokenContract.methods
      .approve(allowanceTarget, maxApproval)
      .send({
        from: address,
        maxPriorityFeePerGas: 40000000000,
      })
      .then((tx: any) => {
        console.log(tx);
      });
    setApproveButton(false);
  };
  const SwapToken = async (quote: any, address: any) => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider);
    // Perform the swap
    const { data, to, value, gas, gasPrice } = quote.data;
    const swapTxHash = await web3.eth.sendTransaction({
      from: address,
      to,
      data,
      value,
      gas,
      gasPrice,
    });
    console.log(swapTxHash);
    setFixSwapContent(false);
    setLoading(false);
  };
  const getAmount = async (
    tokenOne: any,
    tokenTwo: any,
    tokenAmountOne: any,
  ) => {
    const amountTokenSell = await getAmountTokenSell(
      tokenOne,
      tokenTwo,
      tokenAmountOne,
    ).then((res) => {
      setTokenAmountTwo(res);
      setLoading(false);
    });
  };
  const handleApprove = async (
    address: any,
    tokenOne: any,
    tokenTwo: any,
    tokenAmountOne: any,
  ) => {
    const allowanceTarget = await getQuoteWithoutAdress(
      tokenOne,
      tokenTwo,
      tokenAmountOne,
    ).then((res) => {
      return res?.data.allowanceTarget;
    });
    approveToken(allowanceTarget, address, tokenOne.address);
  };
  const handleChangeToken = (
    tokenOne: Object,
    tokenTwo: Object,
    maxTokenOne: any,
    maxTokenTwo: any,
  ) => {
    const temp = tokenOne;
    const tempAmount = maxTokenOne;
    setMaxTokenOne(maxTokenTwo);
    setMaxTokenTwo(tempAmount);
    setTokenOne(tokenTwo);
    setTokenTwo(temp);
  };
  useEffect(() => {
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
                      onClick={() =>
                        handleChangeToken(
                          tokenOne,
                          tokenTwo,
                          maxTokenOne,
                          maxTokenTwo,
                        )
                      }
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
          <div className="flex flex-row">
            {approveButton && (
              <button
                onClick={() =>
                  handleApprove(address, tokenOne, tokenTwo, tokenAmountOne)
                }
                className={`flex items-center ${
                  tokenAmountOne >= maxTokenOne
                    ? 'bg-slate-300'
                    : 'bg-blue-500 '
                } w-full m-1 justify-center rounded-xl border-4 border-black hover:cursor-pointer px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50`}
              >
                <div>
                  <p className="font-mono font-bold text-white">Approve</p>
                </div>
              </button>
            )}
            <button
              disabled={
                tokenAmountOne >= maxTokenOne || approveButton === true
                  ? true
                  : false
              }
              onClick={() =>
                ReviewSwap(
                  tokenOne,
                  tokenTwo,
                  tokenAmountOne,
                  address,
                  maxTokenOne,
                )
              }
              className={`flex items-center ${
                tokenAmountOne >= maxTokenOne || approveButton === true
                  ? 'bg-slate-300'
                  : 'bg-blue-500 '
              } w-full m-1 justify-center rounded-xl border-4 border-black hover:cursor-pointer px-8 py-4 font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring active:bg-pink-50`}
            >
              <div>
                <p className="font-mono font-bold text-white">Review Swap</p>
              </div>
            </button>
          </div>
        ) : null}
        {!loading && !openConnectModal && fixSwapContent ? (
          <div
            onClick={() => SwapToken(quote, address)}
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
