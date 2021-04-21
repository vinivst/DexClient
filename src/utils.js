import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import Dex from './contracts/Dex.json';
import daiAbi from './contracts/Dai.json';

const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      try {
        const web3 = new Web3(window.ethereum);
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else {
      const provider = new Web3.providers.HttpProvider('http://localhost:9545');
      const web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      resolve(web3);
    }
    reject('Install Metamask');
  });
};

const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Dex.networks[networkId];
  const dex = await new web3.eth.Contract(
    Dex.abi,
    deployedNetwork && deployedNetwork.address
  );
  const tokens = await dex.methods.getTokens().call();
  const tokenContracts = tokens.reduce(
    (acc, token) => ({
      ...acc,
      [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract(
        daiAbi.abi,
        token.tokenAddress
      ),
    }),
    {}
  );
  return { dex, ...tokenContracts };
};

export { getWeb3, getContracts };
