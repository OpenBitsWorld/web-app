import is from './openbits-registry-test-init-state.json';
import { handle } from '../../src/contracts/openbits-registry';

// create a fake smartweave object
global.SmartWeave = {
  arweave: {
    ar: {
      winstonToAr: (a) => Number(a / 100000000000),
      arToWinston: (a) => Number(a * 100000000000),
    },
  },
  transaction: {
    id: 'dasdksjdsadasads',
    target: 'XKVU3cnfIXOSQkAAiTse7C2_xnzBkVxeKQ3oXGqAt_4',
    quantity: 10000000,
  },
};

global.ContractError = (err) => {
  throw new Error(err);
};

const registry = handle(is, {
  input: {
    function: 'register',
    name: 'Pippo Baudo',
    version: '0.0.1',
    pstId: 'dsadsaasdda',
  },
  caller: 'XKVU3cnfIXOSQkAAiTse7C2_xnzBkVxeKQ3oXGqAt_4',
});

console.log(JSON.stringify(registry));
