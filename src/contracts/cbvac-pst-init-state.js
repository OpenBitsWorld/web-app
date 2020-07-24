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
    users: [],
    targetProfit,
    generatedProfit: 0,
    sharesAvailableForInvestors: {
      levels,
    },
    balances: {
    },
  };
  template.balances[owners[0]] = 100;
  return template;
};

export default createCbvacPstInitState;
