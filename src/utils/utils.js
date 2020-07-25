// import { interactWrite } from 'smartweave';

export const randomRgba = () => {
  const o = Math.round;
  const r = Math.random;
  const s = 222;
  const randomColor = `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},${r().toFixed(1)})`;
  return randomColor;
};

export const getImageBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://arweave.net/';
  }
  return '@/assets/';
};
/* export const registerNodePackage = async (
  arweave,
  wallet,
  registryAddress,
  name,
  version,
  dataId,
  pstId) => {
  // upload the package to the network
  // create the transaction
  const results = await interactWrite(
    arweave,
    wallet,
    registryAddress, {
      function: 'register',
      name,
      version,
      dataId,
      pstId,
    },
  );
  console.log(results);
}; */

export const getInvestmentLevelsMargin = (targetProfit) => {
  const twentyOfTarget = (targetProfit * 20) / 100;
  const levelOne = (twentyOfTarget * 10) / 100;
  const levelTwo = levelOne + ((twentyOfTarget * 7) / 100);
  const levelThree = levelTwo + ((twentyOfTarget * 5) / 100);
  const levelFour = levelThree + ((twentyOfTarget * 3) / 100);
  return [
    levelOne,
    levelTwo,
    levelThree,
    levelFour,
  ];
};

export const getInvestmentLevels = (targetProfit, owner) => {
  const levelsMargin = getInvestmentLevelsMargin(targetProfit);
  const levels = [];
  [10, 7, 5, 3].forEach((v, k) => {
    const pricePerShare = (targetProfit / 100) / v || 1;
    const expectedROI = ((targetProfit / 100) * 5) - (pricePerShare * 5);
    levels.push({
      multiplier: v,
      beforeProfit: levelsMargin[k],
      amountOfShares: 5,
      pricePerShare,
      expectedROI,
      owner,
      available: false,
    });
  });
  return levels;
};
