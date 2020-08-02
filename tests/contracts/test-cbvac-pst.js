// import batmanise from './batmanise-test-init-state.json';
// import supermanise from './supermanise-test-init-state.json';
import captainamericanise from './captainamericanise-test-init-state.json';
import { handle } from '../../src/contracts/cbvac-pst';

// console.log(batmanise);
// console.log(supermanise);
// console.log(captainamericanise);

// create a fake smartweave object
global.SmartWeave = {
  arweave: {
    ar: {
      winstonToAr: (a) => a / 100000000000,
    },
  },
  transaction: {
    target: 'rjXAMsy9nmB8ttyPfhHZhjGx_8ey9FKDMqcHDb6OAP8',
    quantity: 1000000000,
  },
};

global.ContractError = (err) => {
  throw new Error(err);
};

// test the captainamericanise
let capt = captainamericanise;

// call one installation, after that the shares of the last investor should be 3
capt = handle(capt, {
  input: {
    function: 'install',
  },
  caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
});
let res = {
  currentMultiverseAccount: capt.currentMultiverseAccount,
  MultiverseWaitingList: capt.MultiverseWaitingList,
  sharesPayedToTheMultiverse: capt.sharesPayedToTheMultiverse,
  installationsToReleaseShares: capt.installationsToReleaseShares,
  generatedProfit: capt.generatedProfit,
  currentlyIsPaying: capt.currentlyIsPaying,
  sharesReleaseIn: capt.sharesReleaseIn,
  balances: capt.balances,
};

// call install 19 times, after that there should be one user in the
// multiverse waiting list and one user in the next multiverse user object
for (let i = 0; i < 19; i += 1) {
  capt = handle(capt, {
    input: {
      function: 'install',
    },
    caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
  });
  res = {
    currentMultiverseAccount: capt.currentMultiverseAccount,
    MultiverseWaitingList: capt.MultiverseWaitingList,
    sharesPayedToTheMultiverse: capt.sharesPayedToTheMultiverse,
    installationsToReleaseShares: capt.installationsToReleaseShares,
    generatedProfit: capt.generatedProfit,
    currentlyIsPaying: capt.currentlyIsPaying,
    sharesReleaseIn: capt.sharesReleaseIn,
    balances: capt.balances,
  };
  if (i === 2) {
    global.SmartWeave.transaction.target = '11aLj-LtMzIUrlCxRltoxs84qfvBN6omNArOkoOGS90';
  }
  if (i === 7) {
    global.SmartWeave.transaction.target = 'Ly-jR1h1BrdUTtCMXdgtzSm0mZ-qoI3n9YchDqtmcO8';
  }
  if (i === 12) {
    global.SmartWeave.transaction.target = 'XKVU3cnfIXOSQkAAiTse7C2_xnzBkVxeKQ3oXGqAt_4';
  }
  if (i === 17) {
    global.SmartWeave.transaction.target = '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS';
  }
  console.log(res);
}

// call 100 times and see what happens
// the first time the user to be payd should be 78oQO22yLY1230r4pO4c8Hh6zX£i3&fgg3jVOPENBITS
global.SmartWeave.transaction.target = '78oQO22yLY1230r4pO4c8Hh6zX£i3&fgg3jVOPENBITS';
for (let i = 0; i < 101; i += 1) {
  capt = handle(capt, {
    input: {
      function: 'install',
    },
    caller: '27wEy77WmA1239w8qG6k6Kl5xL£3W&fyv5jNOPENBITS',
  });
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
}

// console.log(captainamericanise);
/* import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
}); */
