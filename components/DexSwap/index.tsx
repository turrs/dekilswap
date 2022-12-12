import React, { useEffect, useState } from "react";
import FixSwap from "../FixSwap";
import SelectToken from "../SelectToken";

type DexSwapProps = {};

const DexSwap = (props: DexSwapProps) => {
  const [loading, setLoading] = useState<DexSwapProps | false>(false);
  const [fixSwapContent, setFixSwapContent] = useState<DexSwapProps | false>(
    false
  );
  const ReviewSwap = () => {
    setLoading(true);
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setLoading(false);
    }, 3000);
    setFixSwapContent(true);
  };
  const SwapToken = () => {
    setLoading(true);

    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setLoading(false);
    }, 3000);
  };

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
                  <SelectToken />
                  <div className="flex justify-center items-center py-2 ">
                    <i className="ri-arrow-up-down-line flex justify-center items-center  "></i>
                  </div>
                  <SelectToken />
                </div>
              )}
            </>
          )}
          {fixSwapContent && !loading ? <FixSwap /> : null}
        </div>
      </div>
      <div className="py-5 w-full">
        {!loading && !fixSwapContent ? (
          <button
            className="bg-slate-800 hover:bg-green-700 w-full h-full rounded-md p-2"
            onClick={ReviewSwap}
          >
            <p className="font-mono font-bold text-white">Review Swap</p>
          </button>
        ) : null}
        {!loading && fixSwapContent ? (
          <button
            className="bg-slate-800 hover:bg-green-700 w-full h-full rounded-md p-2"
            onClick={SwapToken}
          >
            <p className="font-mono font-bold text-white">Swap</p>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default DexSwap;
