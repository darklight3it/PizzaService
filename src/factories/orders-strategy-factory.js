'use strict';
import defaultStrategy from '../strategies/default-strategy';
import cookingStrategy from '../strategies/cooking-strategy';

const create = () => cookingStrategy;

export default { create };
