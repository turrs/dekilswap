import { useContext } from 'react';
import { TransactionContext } from '../../context/Transaction';
import { PriceToken } from '../../utils';

export const getPrice = async (
  tokenOne: any,
  tokenTwo: any,
  tokenAmountOne: any,
) => {
  let tokenAmount = tokenAmountOne * 10 ** tokenOne.decimals;

  try {
    const result = await PriceToken.get(
      `/price?sellToken=${tokenOne.address}&buyToken=${tokenTwo.address}&sellAmount=${tokenAmount}`,
    )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  } catch (err) {}
};

export const getAmountTokenSell = async (
  tokenOne: any,
  tokenTwo: any,
  tokenAmountOne: any,
) => {
  let tokenAmount = tokenAmountOne * 10 ** tokenOne.decimals;

  try {
    const result = await PriceToken.get(
      `/price?sellToken=${tokenOne.address}&buyToken=${tokenTwo.address}&sellAmount=${tokenAmount}`,
    )
      .then((res) => {
        console.log(
          'jumlah buy amount',
          res.data.buyAmount / 10 ** tokenTwo.decimals,
        );

        return (res.data.buyAmount / 10 ** tokenTwo.decimals).toFixed(6);
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  } catch (err) {}
};

export const getQuote = async (
  tokenOne: any,
  tokenTwo: any,
  tokenAmountOne: any,
  address: any,
) => {
  do {
    try {
      let tokenAmount = tokenAmountOne * 10 ** tokenOne.decimals;
      const result = await PriceToken.get(
        `/quote?sellToken=${tokenOne.address}&buyToken=${tokenTwo.address}&sellAmount=${tokenAmount}&takerAddress=${address}`,
      ).then((res) => {
        return res;
      });
      return result;
    } catch (res) {
      console.log(res);
      continue; // go again
    }
    break;
  } while (true);
};
