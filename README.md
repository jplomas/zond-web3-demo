# QRL Zond Testnet Transaction Test

## Prerequisites

- nodejs
- npm

You will also need a QRL Zond Dilithium wallet with some funds in it and access to a Zond node RPC server (a running `gzond` instance).

## Use

1. Clone repo and run `npm install` inside the repo directory
2. Create and edit the .env file as per below (or set the variables in your environment)
3. Run `npm run test`

## .env file

Ensure there is an .env file in the root of the repo with the following variables set:

```bash
PROVIDER = "http://127.0.0.1:8545" # Zond RPC address, default is localhost:8545
PRIVATE_KEY = "0x[hex]" # Private key of the wallet you want to send from, beginning with 0x
FROM_ADDRESS = "0x[hex]" # Address of the wallet you want to send from
TO_ADDRESS = "0x[hex]" # Address of the wallet you want to send to
MAX_FEE_PER_GAS = 2000000000 # Maximum fee per gas, eg. 2000000000, in nShor (1 Shor = 10^9 nShor)
MAX_PRIORITY_FEE_PER_GAS = 1000000000 # Maximum priority fee per gas, eg. 1000000000, nShor (1 Shor = 10^9 nShor)
VALUE_TO_SEND = 10000000000 # Amount to send in nShor (1 Shor = 10^9 nShor)
```
