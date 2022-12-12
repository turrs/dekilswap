import React from "react";

type FixSwapProps = {};

const FixSwap = (props: FixSwapProps) => {
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
                  <img src="https://wallet-asset.matic.network/img/tokens/eth.svg"></img>
                </div>
                <div>
                  <p className="font-sans font-bold text-slate-800 text-xl">
                    1 ETH
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="font-mono font-semibold text-sm text-slate-700">
                  0.98 $
                </p>
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
              You Pay
            </p>
            <div className="flex flex-row justify-between pt-1">
              <div className="flex flex-row items-center">
                <div className="pr-2">
                  <img src="https://wallet-asset.matic.network/img/tokens/eth.svg"></img>
                </div>
                <div>
                  <p className="font-sans font-bold text-slate-800 text-xl">
                    1 ETH
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="font-mono font-semibold text-sm text-slate-700">
                  0.98 $
                </p>
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
              1 MATIC @ 0.880394
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <p className="font-sans font-semibold text-slate-800 text-sm">
              Estimated Fee
            </p>
          </div>
          <div>
            <p className="font-sans font-semibold text-slate-900 text-sm">9</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixSwap;
