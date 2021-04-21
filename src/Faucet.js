import React, { useState } from 'react';

function Faucet({ user, faucet }) {
  const [amount, setAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    faucet(user.selectedToken, user.accounts[0], amount);
  };

  return (
    <div id="wallet" className="card">
      <h2 className="card-title">Faucet</h2>
      <h3>Generate {user.selectedToken.ticker}</h3>
      <form id="transfer" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group row">
          <label htmlFor="amount" className="col-sm-4 col-form-label">
            Amount
          </label>
          <div className="col-sm-8">
            <div className="input-group mb-3">
              <input
                id="amount"
                type="text"
                className="form-control"
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  {user.selectedToken.ticker}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Faucet;
