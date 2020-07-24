export function handle(state, action) {
  const { balances, sharesAvailableForInvestors } = state;
  const { input, caller } = action;

  if (input.function === 'buy') {
    const requestedLevel = sharesAvailableForInvestors.levels[input.level];
    // check if the shares for the requested level are still available
    if (!requestedLevel.available) {
      throw new ContractError('Function BUY: Shares for the level you are requesting are not available');
    }

    // the investor cant be an owner and cant be already an investor
    if (state.owners.includes(caller)
      || state.investors.includes(caller)) {
      throw new ContractError('Function BUY: To buy shares you cannot be one of the owners or you cannot be already an investor.');
    }

    // compute the price of the shares for the investors
    const totalSharesPrice = requestedLevel.pricePerShare * requestedLevel.amountOfShares;

    // check if the investor has sent the right amount of AR
    if (SmartWeave.transaction.quantity !== SmartWeave.arweave.ar.arToWinston(totalSharesPrice)) {
      throw new ContractError(`Function BUY: To buy shares for an expected ROI of ${requestedLevel}x you have to pay ${totalSharesPrice} winston. You sent ${SmartWeave.transaction.quantity} winston`);
    }

    // check if the target is the owner of the shares
    if (SmartWeave.transaction.target !== requestedLevel.owner) {
      throw new ContractError(`Function BUY: To buy shares for you to send ${SmartWeave.arweave.ar.arToWinston(totalSharesPrice)} winston to the address ${requestedLevel.owner}. You sent ${SmartWeave.transaction.target} winston`);
    }

    // update the investors array
    state.investors.push(caller);

    // Lower the token balance of the caller
    balances[SmartWeave.transaction.target] -= requestedLevel.amountOfShares;
    if (SmartWeave.transaction.target in balances) {
      // Wallet already exists in state, add new tokens
      balances[SmartWeave.transaction.target] += requestedLevel.amountOfShares;
    } else {
      // Wallet is new, set starting balance
      balances[SmartWeave.transaction.target] = requestedLevel.amountOfShares;
    }

    return { state };
  }

  if (input.function === 'balance') {
    const { target } = input;
    const { ticker } = state;

    if (typeof target !== 'string') {
      throw new ContractError('Must specify target to get balance for');
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError('Cannot get balance, target does not exist');
    }

    return { result: { target, ticker, balance: balances[target] } };
  }

  throw new ContractError(`No function supplied or function not recognized: "${input.function}"`);
}
