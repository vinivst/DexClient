import React, { useState, useEffect } from 'react';
import { getWeb3, getContracts } from './utils';
import App from './App';

function LoadingContainer() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contracts, setContracts] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      setWeb3(web3);
      const contracts = await getContracts(web3);
      setContracts(contracts);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    };
    init();
  }, []);

  const isReady = () => {
    return (
      typeof web3 !== 'undefined' &&
      typeof contracts !== 'undefined' &&
      accounts.length > 0
    );
  };

  if (!isReady()) {
    return <div>Loading...</div>;
  }

  return <App web3={web3} contracts={contracts} accounts={accounts} />;
}

export default LoadingContainer;
