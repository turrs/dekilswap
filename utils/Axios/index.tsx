import axios from "axios";

const ListToken = axios.create({
  baseURL:
    "https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json",
});

const PriceToken = axios.create({
  baseURL: "https://polygon.api.0x.org/swap/v1",
});
const GasPolygon = axios.create({
  baseURL: "https://gasstation-mainnet.matic.network/v2",
});

export { ListToken, PriceToken, GasPolygon };
