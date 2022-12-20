import React, { ChangeEvent, useContext, useEffect } from 'react';
import { TransactionContext } from '../../context/Transaction';
import SelectModal from '../SelectModal';

type SelectTokenProps = {
  type: any;
};

const SelectToken = (type: SelectTokenProps) => {
  const {
    setTokenAmountTwo,
    setTokenAmountOne,
    tokenAmountOne,
    tokenAmountTwo,
    maxTokenOne,
    maxTokenTwo,
    tokenOne,
    tokenTwo,
  } = useContext(TransactionContext);
  const handleChange = (event: ChangeEvent<HTMLInputElement>, type: any) => {
    // do the rest here

    if (type?.type === 'tokenOne') {
      setTokenAmountOne(event.target.value);
    }
    if (type?.type === 'tokenTwo') {
    }
  };
  const handleMax = (maxTokenOne: any) => {
    setTokenAmountOne(maxTokenOne - 0.0001);
  };

  useEffect(() => {}, [tokenAmountTwo]);

  return (
    <div>
      <div className="pb-2 flex flex-row justify-between">
        <div>
          <p className="font-mono font-semibold text-slate-600 text-sm ">
            {type.type === 'tokenOne' ? 'You Pay' : 'You Receive'}
          </p>
        </div>
        <div>
          <p
            className={`font-mono font-semibold text-slate-400  text-xs ${
              type.type === 'tokenOne'
                ? 'hover:cursor-pointer hover:underline'
                : ''
            }`}
            onClick={() => handleMax(maxTokenOne)}
          >
            {type.type === 'tokenOne'
              ? 'Max ' + maxTokenOne + ' ' + tokenOne.symbol
              : 'Balance ' + maxTokenTwo + ' ' + tokenTwo.symbol}
          </p>
        </div>
      </div>
      <div className="flex py-2 w-80 bg-slate-100 rounded-lg flex-row justify-between">
        <div className="px-3 w-full h-full">
          <SelectModal type={type} />
        </div>
        <div className="px-3 flex flex-col text-end ">
          <div>
            <input
              type="number"
              value={
                type?.type === 'tokenOne' ? tokenAmountOne : tokenAmountTwo
              }
              onChange={(e) => handleChange(e, type)}
              className="bg-slate-100 text-end font-mono font-semibold outline-0"
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
