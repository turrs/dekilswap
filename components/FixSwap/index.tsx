import React, { useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/Transaction';
import { getQuote } from '../FunctionAPI';

type FixSwapProps = {};

const FixSwap = () => {
  const { tokenAmountOne, tokenOne, tokenTwo, quote } =
    useContext(TransactionContext);
  useEffect(() => {
    console.log(quote);
    console.log('jalannin');
  }, [quote]);

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col rounded w-full min-h-full bg-slate-100">
          <div className="p-4">
            <p className="font-mono font-semibold text-slate-600 text-sm">
              You Pay
            </p>
            <div className="flex flex-row justify-between pt-1">
              <div className="flex flex-row items-center">
                <div className="pr-2">
                  <img src={tokenOne.logoURI}></img>
                </div>
                <div>
                  <p className="font-sans font-bold text-slate-800 text-xl">
                    {tokenAmountOne} {tokenOne.symbol}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="font-mono font-semibold text-sm text-slate-700"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-1"></div>
      <div>
        <div className="flex flex-col rounded w-full h-20 bg-slate-100">
          <div className="p-4">
            <p className="font-mono font-semibold text-slate-600 text-sm">
              You Received
            </p>
            <div className="flex flex-row justify-between pt-1">
              <div className="flex flex-row items-center">
                <div className="pr-2">
                  <img src={tokenTwo.logoURI}></img>
                </div>
                <div>
                  <p className="font-sans font-bold text-slate-800 text-xl">
                    {(quote?.data?.buyAmount / 10 ** tokenTwo.decimals).toFixed(
                      6,
                    )}{' '}
                    {tokenTwo.symbol}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="font-mono font-semibold text-sm text-slate-700"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <p className="font-sans font-semibold text-slate-800 text-sm">
              Rate
            </p>
          </div>
          <div>
            <p className="font-sans font-semibold text-green-500 text-sm">
              1 {tokenOne.symbol} @ {quote?.data?.guaranteedPrice}{' '}
              {tokenTwo.symbol}
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <p className="font-sans font-semibold text-slate-800 text-sm">
              Estimated price impact
            </p>
          </div>
          <div>
            <p className="font-sans font-semibold text-slate-900 text-sm">
              {quote?.data?.estimatedPriceImpact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixSwap;
