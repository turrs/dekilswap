import React, { useState } from "react";

type SelectModalProps = {};

const SelectModal = (props: SelectModalProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div
        className="flex flex-row  rounded-md hover:bg-slate-50"
        onClick={() => setShowModal(true)}
      >
        <div className="p-1">
          <img src="https://wallet-asset.matic.network/img/tokens/eth.svg"></img>
        </div>
        <div className="p-1">
          <p className="font-sans font-semibold">PIP</p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="flex  min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="mt-3 sm:flex w-full">
                <div className="mt-2 text-center sm:ml-4 sm:text-left w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between w-full pb-5">
                      <div className="bg-slate-100 rounded-sm w-[40px] h-[40px] flex justify-center items-center">
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
                    <div className="flex flex-row py-3 w-full rounded hover:bg-slate-200">
                      <div className="px-5">
                        <div className="p-2 bg-slate-50 rounded flex justify-center items-center">
                          <img src="https://wallet-asset.matic.network/img/tokens/matic.svg"></img>
                        </div>
                      </div>
                      <div className="flex shrink flex-row w-full justify-between items-center">
                        <div className="px-2">
                          <p className="font-mono font-semibold">Matic</p>
                        </div>
                        <div className="px-2">
                          <p className="font-mono font-semibold">1</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row py-3 w-full rounded hover:bg-slate-200">
                      <div className="px-5">
                        <div className="p-2 bg-slate-50 rounded flex justify-center items-center">
                          <img src="https://wallet-asset.matic.network/img/tokens/matic.svg"></img>
                        </div>
                      </div>
                      <div className="flex shrink flex-row w-full justify-between items-center">
                        <div className="px-2">
                          <p className="font-mono font-semibold">Matic</p>
                        </div>
                        <div className="px-2">
                          <p className="font-mono font-semibold">1</p>
                        </div>
                      </div>
                    </div>
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
