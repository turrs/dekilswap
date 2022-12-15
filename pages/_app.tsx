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
import { polygon } from "wagmi/chains";
const { chains, provider } = configureChains(
  [polygon],
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
