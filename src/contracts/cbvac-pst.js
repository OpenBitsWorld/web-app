export function handle(state, action) {
  const {
    balances,
    sharesAvailableForInvestors,
    currentlyIsPaying } = state;
  const { input, caller } = action;
  const installationPrice = 0.01;
  const transactionAmountAr = SmartWeave.arweave.ar.winstonToAr(SmartWeave.transaction.quantity);
  const receiver = SmartWeave.transaction.target;
  const owner = state.owners[0];
  const sharesOwners = Object.keys(balances);

  // this will be called when users install the openbit
  if (input.function === 'install') {

    // check if the user has sent 0.01
    if (Number(transactionAmountAr) !== installationPrice) {
      throw new ContractError(`Function INSTALL: To install the package you have to pay ${installationPrice} AR. You sent ${Number(transactionAmountAr)}`);
    }
    // check if the target is the is currently payed by the contract
    if (receiver !== currentlyIsPaying) {
      throw new ContractError(`Function INSTALL: To install the package you have to pay ${installationPrice} AR to ${currentlyIsPaying}`);
    }

    // update the generated profit of the OpenBit
    state.generatedProfit = state.generatedProfit + installationPrice;

    // check if the caller is an existing user. If so, update the number of installation, otherwise create the user
    // but only if the user is not currently in the multiverse waiting list
    if (!state.MultiverseWaitingList[caller]) {
      if (state.users[caller]) {
        state.users[caller] = state.users[caller] + installationPrice;
      } else {
        state.users[caller] = installationPrice;
      }
    }

    // check if the OpenBit has reached an investment level. If so, disable that level.
    for (let i = 0; i < sharesAvailableForInvestors.levels.length; i += 1) {
      if (state.generatedProfit >= sharesAvailableForInvestors.levels[i].beforeProfit) {
        sharesAvailableForInvestors.levels[i].available = false;
        if (sharesAvailableForInvestors.levels[i + 1]) {
          sharesAvailableForInvestors.levels[i].available = true;
        }
      }
    }

    // decrease the amount of installations are needed for a release
    state.sharesReleaseIn = state.sharesReleaseIn - 1;

    // check if the installation generates a share transition, if so
    if (state.sharesReleaseIn === 0) {
      // a share must be released
      // update the share release counter
      state.sharesReleaseIn = state.installationsToReleaseShares;

      // the owner has still more than 1 share:
      if (balances[owner] > 1) {
        // transfer a share of the owner to the multiverse
        balances[owner] = balances[owner] - 1;
        balances['multiverse'] = balances['multiverse'] + 1;
        return { state };
      }

      // the OpenBit is currently owned only by the creator and the multiverse
      // so, it is the multiverse turn to be payed for shares
      if (sharesOwners.length === 2) {
        // if the users list is empty the game restarts
        if (Object.keys(state.users).length === 0) {
          state.users = state.MultiverseWaitingList;
          state.MultiverseWaitingList = {};
        }

        // check if there was 99 shares releases after the OpenBit was given to the multiverse
        if (state.sharesPayedToTheMultiverse !== 0 && state.sharesPayedToTheMultiverse % 99 === 0) {
          // the next to be payed must be the original owner
          state.currentlyIsPaying = owner;

          // increase the number of shares payed to the multiverse
          state.sharesPayedToTheMultiverse = state.sharesPayedToTheMultiverse + 1;

          return { state };
        }

        // increase the number of shares payed to the multiverse
        state.sharesPayedToTheMultiverse = state.sharesPayedToTheMultiverse + 1;

        // get the user that has installed more the OpenBit
        const nextUserForMultiverse = Object.entries(state.users).sort(function (a, b) {
          return a[1] - b[1];
        }).pop();

        // put the current multiverse user in the waiting list
        state.MultiverseWaitingList[Object.entries(state.currentMultiverseAccount)[0][0]] = Object.entries(state.currentMultiverseAccount)[0][1];

        state.currentMultiverseAccount = {};
        state.currentMultiverseAccount[nextUserForMultiverse[0]] = nextUserForMultiverse[1];
        state.currentlyIsPaying = nextUserForMultiverse[0];

        delete state.users[nextUserForMultiverse[0]];
        return { state };
      }

      // check if there are investors
      if (sharesOwners.length > 2) {
        // get the last investor
        const currentInvestor = sharesOwners[sharesOwners.length - 1];

        // remove the share from the investor
        balances[currentInvestor] = balances[currentInvestor] - 1;
        // give the share to the multiverse
        balances['multiverse'] = balances['multiverse'] + 1;

        // if the investor has still shares return
        if (balances[currentInvestor] > 0) {
          return { state };
        }
        // else delete the investor from the array
        delete balances[currentInvestor];

        // get the owners of shares after deletion
        const ownerOfSharesNow = Object.keys(balances)

        // set the currentlyPaying to the next investor if there is one and return
        if (ownerOfSharesNow.length > 2) {
          state.currentlyIsPaying = ownerOfSharesNow[ownerOfSharesNow.length - 1];
          return { state };
        }
        // else it is the time of the first multiverse user
        // get the user that has installed more the OpenBit
        const nextUserForMultiverse = Object.entries(state.users).sort(function (a, b) {
          return a[1] - b[1];
        }).pop();

        // the first multiverse user will become the first to be payed
        state.currentMultiverseAccount[nextUserForMultiverse[0]] = nextUserForMultiverse[1];
        state.currentlyIsPaying = nextUserForMultiverse[0];

        // remove the user from the users list
        delete state.users[nextUserForMultiverse[0]];

        return { state };
      }
    }
    // a share must not be released
    return { state };
  }

  if (input.function === 'buy') {
    // there can be only one level available in each moment
    const requestedLevel = sharesAvailableForInvestors.levels[input.level];

    // check if the shares for the requested level are still available
    if (!requestedLevel.available) {
      throw new ContractError('Function BUY: Shares for the level you are requesting are not available');
    }

    // the investor can't be an owner and can't be already an investor
    if (state.owners.includes(caller)
      || state.investors.includes(caller)) {
      throw new ContractError('Function BUY: To buy shares you cannot be one of the owners or you cannot be already an investor.');
    }

    // compute the price of the shares for the investors
    const totalSharesPrice = requestedLevel.pricePerShare * requestedLevel.amountOfShares;

    // check if the investor has sent the right amount of AR
    if (SmartWeave.transaction.quantity !== SmartWeave.arweave.ar.arToWinston(totalSharesPrice)) {
      throw new ContractError(`Function BUY: To buy shares for an expected ROI of ${requestedLevel.expextedROI} you have to pay ${totalSharesPrice} winston. You sent ${SmartWeave.transaction.quantity} winston`);
    }

    // check if the target is the owner of the shares
    if (SmartWeave.transaction.target !== requestedLevel.owner) {
      throw new ContractError(`Function BUY: To buy shares for level ${input.level} you have to send ${SmartWeave.arweave.ar.arToWinston(totalSharesPrice)} winston to the address ${requestedLevel.owner}.`);
    }

    // update the investors array
    state.investors.push(caller);

    // update levels availability
    sharesAvailableForInvestors.levels[input.level].available = false;
    sharesAvailableForInvestors.levels[input.level].owner = caller;
    if ( sharesAvailableForInvestors.levels[input.level + 1]
      && state.generatedProfit < sharesAvailableForInvestors.levels[input.level + 1].beforeProfit) {
      sharesAvailableForInvestors.levels[input.level + 1].available = true;
    }

    // Lower the token balance of the caller
    balances[SmartWeave.transaction.target] = requestedLevel.amountOfShares;

    return { state };
  }
  throw new ContractError(`No function supplied or function not recognized: "${input.function}"`);
}
