export function handle(state, action) {
  const { balances, sharesAvailableForInvestors } = state;
  const { input, caller } = action;
  const installationPrice = 0.01;
  const pricePerShare = state.targetProfit / 100;
  const currentProfit = state.generatedProfit;

  // this will be called when users install the openbit
  if (input.function === 'install') {
    const transactionAmountAr = SmartWeave.arweave.ar.winstonToAr(SmartWeave.transaction.amount);
    const receiver = SmartWeave.transaction.target;
    const owner = state.owners[0];
    const currentlyIsPaying = state.currentlyIsPaying;

    // check if the user has sent 0.01
    if (Number(transactionAmountAr) !== installationPrice) {
      throw new ContractError(`Function INSTALL: To install the package you have to pay ${installationPrice} AR`);
    }
    // check if the target is the is currently payed by the contract
    if (receiver !== currentlyIsPaying) {
      throw new ContractError(`Function INSTALL: To install the package you have to pay ${installationPrice} AR to ${currentlyIsPaying}`);
    }

    // update the generated profit of the OpenBit

    // check if the caller is an existing user. If so, update number of installation, otherwise create the user

    // check if the openbit has reached an investment level. If so, disable that level.

    // check if the installation generates a share transition, if so
      // the owner has still more than 1 share:
        // p
      // if the owner still has more than 1 share, move one of the owner shares to the multiverse
      // else, if the level 4 investors has more than 0 share, move one of the investor shares to the multiverse
      // else, if the level 3 investors has more than 0 share, move one of the investor shares to the multiverse
      // else, if the level 2 investors has more than 0 share, move one of the investor shares to the multiverse
      // else, if the level 1 investors has more than 0 share, move one of the investor shares to the multiverse
      // else,
        // put the current multiverse account in the waiting list
        // sort another user to be to multiverse

  }

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
