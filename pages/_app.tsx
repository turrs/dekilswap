import "../styles/globals.css";
import type { AppProps } from "next/app";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import "remixicon/fonts/remixicon.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { ReactNode, useContext } from "react";
import {
  TransactionProvider,
  TransactionContext,
} from "../context/Transaction";
import { TokenListProvider } from "../context/TokenList";
import { mainnet, polygon } from "@wagmi/core/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { Chain } from "wagmi";

export const neonevm = {
  id: 245022926,
  name: "neon devnet",
  network: "neon devnet",
  nativeCurrency: {
    decimals: 9,
    name: "Neon",
    symbol: "Neon",
  },
  rpcUrls: {
    public: "https://devnet.neonevm.org",
    default: "https://devnet.neonevm.org",
  },
  blockExplorers: {
    etherscan: { name: "neonscan", url: "https://neonscan.com" },
    default: { name: "neonscan", url: "https://neonscan.com" },
  },
} as const satisfies Chain;

export const neonevmMainnet = {
  id: 245022926,
  name: "neon Mainnet",
  network: "neon devnet",
  nativeCurrency: {
    decimals: 9,
    name: "Neon",
    symbol: "Neon",
  },
  rpcUrls: {
    public: "https://devnet.neonevm.org",
    default: "https://devnet.neonevm.org",
  },
  blockExplorers: {
    etherscan: { name: "neonscan", url: "https://neonscan.com" },
    default: { name: "neonscan", url: "https://neonscan.com" },
  },
} as const satisfies Chain;
const defaultChains: Chain[] = [
  {
    ...mainnet,
  },
  {
    ...polygon,
  },
];
const { provider, chains } = configureChains(
  [mainnet, neonevm],
  [
    alchemyProvider({ apiKey: "YTQiZJGziVyT9G8R1BhEYdhZhdQrgEyV" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TransactionProvider>
      <TokenListProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            coolMode
            showRecentTransactions={true}
          >
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </TokenListProvider>
    </TransactionProvider>
  );
}
