import React from "react";
import SelectModal from "../SelectModal";

type SelectTokenProps = {};

const SelectToken = (props: SelectTokenProps) => {
  return (
    <div>
      <div className="pb-2">
        <p className="font-sans font-semibold">You Pay</p>
      </div>
      <div className="flex py-2 w-80 bg-slate-100 rounded-lg flex-row justify-between">
        <div className="px-3">
          <SelectModal />
        </div>
        <div className="px-3">
          <input
            type="number"
            className="bg-slate-100 text-end font-mono font-semibold outline-0"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
