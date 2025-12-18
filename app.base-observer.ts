// app.base-observer.ts
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { createPublicClient, http, formatEther } from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = {
  chain: typeof base;
  chainId: number;
  rpc: string;
  explorer: string;
  label: string;
};

const NETWORKS: Network[] = [
  {
    chain: base,
    chainId: 8453,
    rpc: "https://mainnet.base.org",
    explorer: "https://basescan.org",
    label: "Base Mainnet",
  },
  {
    chain: baseSepolia,
    chainId: 84532,
    rpc: "https://sepolia.base.org",
    explorer: "https://sepolia.basescan.org",
    label: "Base Sepolia",
  },
];

let active = NETWORKS[1];

async function connectWallet() {
  const sdk = new CoinbaseWalletSDK({
    appName: "Base Observer",
    appLogoUrl: "https://base.org/favicon.ico",
  });

  const provider = sdk.makeWeb3Provider(active.rpc, active.chainId);

  const accounts = (await provider.request({
    method: "eth_requestAccounts",
  })) as string[];

  const address = accounts[0];

  const chainIdHex = (await provider.request({
    method: "eth_chainId",
  })) as string;

  return { provider, address, chainId: parseInt(chainIdHex, 16) };
}

async function readChainState(address: string) {
  const client = createPublicClient({
    chain: active.chain,
    transport: http(active.rpc),
  });

  const [blockNumber, balance] = await Promise.all([
    client.getBlockNumber(),
    client.getBalance({ address: address as `0x${string}` }),
  ]);

  return { blockNumber, balance };
}

function render(text: string) {
  document.body.innerText = text;
}

async function run() {
  render("Connecting to wallet...");

  const session = await connectWallet();

  render("Reading Base network state...");

  const state = await readChainState(session.address);

  const output = [
    "Base Observer (Built for Base)",
    "",
    `Active network: ${active.label}`,
    `chainId: ${session.chainId}`,
    "",
    `Address: ${session.address}`,
    `ETH balance: ${formatEther(state.balance)} ETH`,
    `Latest block: ${state.blockNumber}`,
    "",
    `Explorer link: ${active.explorer}/address/${session.address}`,
    "",
    "Notes:",
    "- Network explicitly targets Base (8453 / 84532)",
    "- All operations are read-only",
    "- Suitable for account abstraction–compatible wallets",
  ].join("\n");

  render(output);
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.createElement("button");
  toggle.innerText = "Toggle Network";
  toggle.onclick = () => {
    active = active.chainId === 84532 ? NETWORKS[0] : NETWORKS[1];
    run();
  };

  document.body.appendChild(toggle);
  run();
});
