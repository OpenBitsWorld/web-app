/**
  This is the contract that handles the registry of OpenBits.
  The OpenBits state is structured as following

  {
    "openbits": {
      "nodePackages": []
    }
  }

  node-packages must be objects structured as following:

  {
    name: string // the name of the package
    ownedBy: arweave-address // the address of the owner of the package
    version: string // the version of the package
    dataId: arweave-id // the arweave id where data are stored
    pstId: arweave-id // the id of the PST linked to the package
  }
*/

export function handle(state, action) {
  if (action.input.function === 'register') {
    // the name is not provided
    if (typeof action.input.name !== 'string') {
      throw new ContractError(`Must provide a name of the package`);
    }
    // the version is not provided
    if (typeof action.input.version !== 'string') {
      throw new ContractError(`Must provide a version of the package`);
    }
    // a package with the same name and version is already registered
    if (state.OpenBits.nodePackages[action.input.name] && state.OpenBits.nodePackages[`${action.input.name}@${action.input.version}`]) {
      throw new ContractError(`A package with the same name and version is already registered`);
    }
    // the PST id is not provided
    if (typeof action.input.pstId !== 'string') {
      throw new ContractError(`Must provide an id of a pst to be associated with the package`);
    }
    // the caller has not sent the right amount of AR to the contract owner
    if (SmartWeave.transaction.quantity !== SmartWeave.arweave.ar.arToWinston('0.0001')) {
      throw new ContractError(`To register a name you should send an amount of AR equal to 0.0001`);
    }
    // AR were not sent to OpenBits owner
    if (SmartWeave.transaction.target !== state.OpenBits.owner) {
      throw new ContractError(`To register a name you should send an amount of AR equal to 0.0001 to the owner of the OpenBits registry`);
    }
    switch (action.input.type) {
      case 'node-package':
        state.OpenBits.nodePackages[`${action.input.name}@${action.input.version}`] = {
          name: action.input.name,
          ownedBy: action.caller,
          version: action.input.version,
          dataId: SmartWeave.transaction.id,
          pstId: action.input.pstId,
        }
        break;
      default:
        state.OpenBits.nodePackages[action.input.name] = {
          name: action.input.name,
          ownedBy: action.caller,
          version: action.input.version,
          dataId: SmartWeave.transaction.id,
          pstId: action.input.pstId,
        }
        break;
    }

    return { state }
  }

  /* if (action.input.function === 'transfer') {

    if (typeof action.input.name !== 'string' || action.input.name < 3) {
      throw new ContractError(`Invalid name provided: ${action.input.name}`);
    }
    if (typeof action.input.target !== 'string') {
      throw new ContractError(`Must provide a target to transfer the name to`);
    }
    if (!state.names[action.input.name]) {
      throw new ContractError(`Name not registered`);
    }
    if (!state.names[action.input.name].ownedBy !== action.caller) {
      throw new ContractError(`Name not owned by caller`);
    }

    state.name[action.input.name].ownedBy = action.input.target;

    return { state }
  } */

  throw new ContractError(`Invalid input`);
}
