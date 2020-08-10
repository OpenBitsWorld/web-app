import Arweave from 'arweave';

import batrandom from './test-batrandom-init-state.json';
import { handle } from '../../src/contracts/cbvac-pst';

/**
 * TEST INSTALL
 */
const testInstall = () => {
  // create a fake smartweave object
  global.SmartWeave = {
    arweave: Arweave.init({
      host: '127.0.0.1',
      port: 1984,
      protocol: 'https',
    }),
    transaction: {
      target: 'Ly-jR1h1BrdUTtCMXdgtzSm0mZ-qoI3n9YchDqtmcO8',
      quantity: 10000000000,
    },
  };

  global.ContractError = (err) => {
    throw new Error(err);
  };

  let br = batrandom;

  // call one installation, after that the shares of the last investor should be 3
  br = handle(br, {
    input: {
      function: 'install',
    },
    caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
  }).state;
  let res = {
    currentMultiverseAccount: br.currentMultiverseAccount,
    MultiverseWaitingList: br.MultiverseWaitingList,
    sharesPayedToTheMultiverse: br.sharesPayedToTheMultiverse,
    installationsToReleaseShares: br.installationsToReleaseShares,
    generatedProfit: br.generatedProfit,
    currentlyIsPaying: br.currentlyIsPaying,
    sharesReleaseIn: br.sharesReleaseIn,
    balances: br.balances,
    levels: br.sharesAvailableForInvestors.levels,
  };
  console.log(res);

  // call install 19 times, after that there should be one user in the
  // multiverse waiting list and one user in the next multiverse user object
  for (let i = 0; i < 4; i += 1) {
    br = handle(br, {
      input: {
        function: 'install',
      },
      caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
    }).state;
    res = {
      currentMultiverseAccount: br.currentMultiverseAccount,
      MultiverseWaitingList: br.MultiverseWaitingList,
      sharesPayedToTheMultiverse: br.sharesPayedToTheMultiverse,
      installationsToReleaseShares: br.installationsToReleaseShares,
      generatedProfit: br.generatedProfit,
      currentlyIsPaying: br.currentlyIsPaying,
      sharesReleaseIn: br.sharesReleaseIn,
      balances: br.balances,
      levels: br.sharesAvailableForInvestors.levels,
    };
    global.SmartWeave.transaction.target = br.currentlyIsPaying;
    console.log(res);
  }

  return true;

  // call 100 times and see what happens
  // the first time the user to be payd should be 78oQO22yLY1230r4pO4c8Hh6zX£i3&fgg3jVOPENBITS
  /* global.SmartWeave.transaction.target = '78oQO22yLY1230r4pO4c8Hh6zX£i3&fgg3jVOPENBITS';
  for (let i = 0; i < 101; i += 1) {
    capt = handle(capt, {
      input: {
        function: 'install',
      },
      caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
    }).state;
    res = {
      currentMultiverseAccount: capt.currentMultiverseAccount,
      MultiverseWaitingList: capt.MultiverseWaitingList,
      users: Object.keys(capt.users).length,
      sharesPayedToTheMultiverse: capt.sharesPayedToTheMultiverse,
      installationsToReleaseShares: capt.installationsToReleaseShares,
      generatedProfit: capt.generatedProfit,
      currentlyIsPaying: capt.currentlyIsPaying,
      sharesReleaseIn: capt.sharesReleaseIn,
      balances: capt.balances,
    };
    global.SmartWeave.transaction.target = capt.currentlyIsPaying;
    console.log(res);
  } */
};

/* const testBuy = () => {
  global.SmartWeave = {
    arweave,
  };
  global.SmartWeave.transaction = {
    target: 'WbUg7wMX4UsXIN0jXANec94CR7wPGJt9KBvJ_eB5jXc',
    quantity: global.SmartWeave.arweave.ar.arToWinston('4.821428571428571'),
  };

  global.ContractError = (err) => {
    throw new Error(err);
  };
  // test the captainamericanise
  let bat = batmanise;

  bat = handle(bat, {
    input: {
      level: 1,
      function: 'buy',
    },
    caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
  });
  console.log(bat);
  console.log(bat.state.sharesAvailableForInvestors);
};

testBuy(); */
testInstall();
