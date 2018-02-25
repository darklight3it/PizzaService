'use strict';
import defaultStrategy from '../strategies/default-strategy';
import cookingStrategy from '../strategies/cooking-strategy';
import deliveryStrategy from '../strategies/delivery-strategy';

const strategies = [defaultStrategy, cookingStrategy, deliveryStrategy];

const create = (strategyName = 'Default') => strategies.find(x => stringEquals(x.name, strategyName)) || defaultStrategy;
 
//#region Private Members
const stringEquals = (a, b) => a.toUpperCase() === b.toUpperCase();
//#endregion
export default { create };
