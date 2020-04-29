// model do banco

const router = require('koa-router')();

// Montante do utilizador
let banks = {
  'joao': 10000,
  'badboy': 100,
  'joaquim': 4000
};

const BankModel = {
  transferMoney: (opts) => {
    let success = false;
    let message = '';
    opts = opts || {};
    if (!banks[opts.to]) {
      message += 'Não exite este utilizador';
    } else {
      banks[opts.from] -= opts.money;
      banks[opts.to] += +opts.money;
      success = true;
    }
    return {
      success: success,
      message: message
    }
  },
  getUserMoney: (userName) => {
    return banks[userName] || 0;
  }
}

module.exports = BankModel;