import React, { useContext } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { TokenListContext } from "../../context/TokenList";
type DisplayBalanceProps = {
  contractAddress: any;
};

const DisplayBalance = ({ contractAddress }: DisplayBalanceProps) => {
  const { address } = useAccount();
  const { apiKey } = useContext(TokenListContext);

  const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
  console.log("adress nih ", address);
  // Replace with the wallet address you want to query:
  const ownerAddr = address;

  // Replace with the token contract address you want to query:
  const tokenAddr = contractAddress;
  console.log("adress nih ", address);
  console.log(" ca adress nih ", contractAddress);
  //   var data = JSON.stringify({
  //     jsonrpc: "2.0",
  //     method: "alchemy_getTokenBalances",
  //     params: [`${ownerAddr}`, [`${tokenAddr}`]],
  //     id: 42,
  //   });

  //   var config = {
  //     method: "post",
  //     url: baseURL,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };
  //   let dataBalance: any = null;
  //   axios(config)
  //     .then(function (response) {
  //       //This line converts the tokenBalance values from hex to decimal
  //       response.data["result"]["tokenBalances"][0]["tokenBalance"] = parseInt(
  //         response.data["result"]["tokenBalances"][0]["tokenBalance"],
  //         16
  //       );
  //       dataBalance = JSON.stringify(response.data.result, null, 2);
  //       console.log("wakewa1", response);
  //       console.log("wakewa", dataBalance);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  return <div>1</div>;
};

export default DisplayBalance;
