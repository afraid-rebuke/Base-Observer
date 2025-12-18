# Base Observer (Built for Base)

Deployed on Base Mainnet.

Base Observer is a browser-based reference implementation designed to validate Base wallet connectivity, network configuration, and read-only onchain state using official Coinbase and Base tooling.

The repository demonstrates correct usage of Base chain identifiers, RPC endpoints, and wallet providers compatible with account abstraction–oriented flows.

---

## Base ecosystem alignment

Built for Base.

Supported networks:
- Base Mainnet  
  chainId (decimal): 8453  
  Explorer: https://basescan.org  

- Base Sepolia  
  chainId (decimal): 84532  
  Explorer: https://sepolia.basescan.org  

The script enforces explicit Base network targeting and performs only non-destructive, read-only operations.

---

## Script behavior

The main script performs the following sequence:

1) Initializes Coinbase Wallet SDK with Base branding  
2) Requests a wallet connection through an EIP-1193 provider  
3) Reads and validates the active chainId  
4) Queries Base RPC for:
   - latest block number  
   - ETH balance of the connected address  
5) Allows network toggling between Base Mainnet and Base Sepolia  
6) Outputs Basescan links for address verification  

This flow is suitable for validating Base account abstraction compatibility and wallet readiness.

---

## Repository structure

- app.base-observer.ts  
  Browser-based script that connects to a wallet, validates Base network context, toggles between networks, and performs read-only RPC queries.

- contracts/  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - arrays.sol — minimal contract used to validate deployment and verification flow  

- package.json  
  Dependency manifest including Coinbase SDKs and multiple repositories from the Base GitHub organization.

- README.md  
  Technical documentation, Base references, licensing, and testnet deployment records.

---

## Libraries used

- @coinbase/wallet-sdk  
  Wallet connection layer compatible with Coinbase and Base tooling.

- viem  
  RPC client used for querying Base networks.

- Base GitHub repositories  
  Included as dependencies to demonstrate integration with the Base open-source ecosystem.

---

## Installation and execution

Install dependencies using Node.js.  
Serve the project with a modern frontend dev server and open the page in a browser.

After approving the wallet connection, the page displays:
- connected address  
- active chainId (8453 or 84532)  
- ETH balance  
- latest block number  
- Basescan verification links  

---

## License

MIT License

Copyright (c) 2025 YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Author

GitHub: https://github.com/afraid-rebuke  
Email: afraid-rebuke.0w@icloud.com
Public contact: https://x.com/annajohansson68

---

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract #1 address (your_contract.sol):  
0x58376311be0d126b6c0e9be92b82cd653e16bf3b

Deployment and verification:
- https://sepolia.basescan.org/address/0x58376311be0d126b6c0e9be92b82cd653e16bf3b
- https://sepolia.basescan.org/address/0x58376311be0d126b6c0e9be92b82cd653e16bf3b/#code  

These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.
