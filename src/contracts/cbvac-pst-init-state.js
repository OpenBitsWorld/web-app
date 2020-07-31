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
    currentMultiverseAccount: {},
    sharesPayedToTheMultiverse: 0,
    targetProfit,
    generatedProfit: 0,
    installationsToReleaseShares: ((targetProfit) / 100) / 0.01,
    currentlyIsPaying: owners[0],
    sharesReleaseIn: ((targetProfit) / 100) / 0.01,
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
