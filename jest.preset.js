const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  coverageReporters: [
    'text',
    'text-summary',
    'json-summary',
    'html',
  ],
};
