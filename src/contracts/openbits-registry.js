export function handle(state, action) {
  const priceToRegister = SmartWeave.arweave.ar.arToWinston('0.0001');
  const sentQuantity = SmartWeave.transaction.quantity;

  if (action.input.function === 'register') {
    // the name is not provided
    if (typeof action.input.name !== 'string') {
      throw new ContractError('Function REGISTER: To register an OpenBit you must provide its name');
    }
    // the version is not provided
    if (typeof action.input.version !== 'string') {
      throw new ContractError('Function REGISTER: To register an OpenBit you must provide its version');
    }
    // a package with the same name and version is already registered
    if (state.OpenBits.nodePackages[`${action.input.name}@${action.input.version}`]) {
      throw new ContractError('Function REGISTER: A package with the same name and version is already registered');
    }
    // the PST id is not provided
    if (typeof action.input.pstId !== 'string') {
      throw new ContractError('Function REGISTER: To register an OpenBit you must provide the address of the CBVAC-PST token associated to it');
    }
    // the caller has not sent the right amount of AR to the contract owner
    if (sentQuantity !== priceToRegister ) {
      throw new ContractError(`Function REGISTER: To register an OpenBit you must pay a ${priceToRegister} AR. You sent ${sentQuantity} AR`);
    }
    // AR were not sent to OpenBits owner
    if (SmartWeave.transaction.target !== state.OpenBits.owner) {
      throw new ContractError('Function REGISTER: To register an OpenBit you must pay an 0.0001 AR to the owner of OpenBits');
    }
    switch (action.input.type) {
      case 'node-package':
        state.OpenBits.nodePackages[`${action.input.name}@${action.input.version}`] = {
          name: action.input.name,
          type: action.input.type,
          ownedBy: action.caller,
          version: action.input.version,
          dataId: SmartWeave.transaction.id,
          pstId: action.input.pstId,
        };
        break;
      default:
        state.OpenBits.nodePackages[action.input.name] = {
          name: action.input.name,
          type: action.input.type,
          ownedBy: action.caller,
          version: action.input.version,
          dataId: SmartWeave.transaction.id,
          pstId: action.input.pstId,
        };
        break;
    }

    return { state };
  }
  throw new ContractError('Invalid input');
}
