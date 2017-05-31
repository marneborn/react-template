'use strict';

module.exports = {
  arrayToString
};

function arrayToString(array) {
  return JSON.stringify(array.join('\n'));
}
