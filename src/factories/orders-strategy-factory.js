'use strict';
import requireDir from 'require-dir';

const defaultStrategyName = 'Default';
const strategyObj = requireDir('../strategies/');
const strategies = Object.keys(strategyObj).map(key => strategyObj[key]).map(x => x.default);

const create = (strategyName = defaultStrategyName) =>
  strategies.find(x => stringEquals(x.name, strategyName)) ||
  strategies.find(x => stringEquals(x.name, defaultStrategyName));
 
//#region Private Members
const stringEquals = (a, b) => a.toUpperCase() === b.toUpperCase();
//#endregion
export default { create };
