const { Web3 } = require('@theqrl/web3');

require('dotenv').config();
const provider = process.env.PROVIDER;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const fromAddress = process.env.FROM_ADDRESS;
const toAddress = process.env.TO_ADDRESS;
const valueToSend = process.env.VALUE_TO_SEND;
const maxFeePerGas = process.env.MAX_FEE_PER_GAS;
const maxPriorityFeePerGas = process.env.MAX_PRIORITY_FEE_PER_GAS;
if (
  !provider ||
  !PRIVATE_KEY ||
  !fromAddress ||
  !toAddress ||
  !valueToSend ||
  !maxFeePerGas ||
  !maxPriorityFeePerGas
) {
  console.log(
    'Please set all environment variables or use a .env file - read the docs!'
  );
  process.exit(1);
}

async function main() {
  console.log('Creating provider instance...');
  const web3 = new Web3(new Web3.providers.HttpProvider(provider));
  console.log('Importing account...');
  const acc = web3.zond.accounts.seedToAccount(PRIVATE_KEY);
  web3.zond.wallet.add(PRIVATE_KEY);
  console.log('Building transaction...');
  const transaction = {
    type: '0x2',
    from: fromAddress,
    to: toAddress,
    value: valueToSend,
    chainId: null,
    gas: null,
    maxFeePerGas: maxFeePerGas,
    maxPriorityFeePerGas: maxPriorityFeePerGas,
    nonce: null,
  };
  const gas = await web3.zond.estimateGas({ transaction });
  transaction.gas = gas;
  const chainId = await web3.zond.getChainId();
  transaction.chainId = chainId;
  const nonce = await web3.zond.getTransactionCount(fromAddress, 'pending');
  transaction.nonce = nonce;

  const signedTx = await acc.signTransaction(transaction, PRIVATE_KEY);
  console.log('Transaction signed! messageHash: ', signedTx.messageHash);

  const txHash = await web3.zond.sendSignedTransaction(signedTx.rawTransaction);
  console.log('Transaction sent! transactionHash: ', txHash.transactionHash);
}

main();
