import { fetch } from '.';

const unitsAPIs = {
  getUnits: () => fetch('units', 'get')
};

export { unitsAPIs };
