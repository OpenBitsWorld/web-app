const createCbvacPstInitState = (
  ticker,
  owners,
  targetProfit,
  levels,
) => {
  const template = {
    ticker,
    shares: 100,
    owners,
    investors: [],
    users: {},
    MultiverseWaitingList: {},
    currentMultiverseAccount: null,
    targetProfit,
    generatedProfit: 0,
    currentlyIsPaying: owners[0],
    sharesAvailableForInvestors: {
      levels,
    },
    balances: {
    },
  };
  template.balances[owners[0]] = 100;
  template.balances.multiverse = 0;
  return template;
};

export default createCbvacPstInitState;
