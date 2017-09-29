'use strict';

const crypto = require('crypto');
const unirest = require('unirest');

const {
  SODEXO_ENCRYPT_ALGORITHM,
  SODEXO_ENCRYPT_KEY
} = process.env;

function encrypt (text) {
  if (!SODEXO_ENCRYPT_ALGORITHM) {
    throw new Error('[sodexo] Missing env SODEXO_ENCRYPT_ALGORITHM');
  }

  if (!SODEXO_ENCRYPT_KEY) {
    throw new Error('[sodexo] Missing env SODEXO_ENCRYPT_KEY');    
  }

  var cipher = crypto.createCipheriv(SODEXO_ENCRYPT_ALGORITHM, SODEXO_ENCRYPT_KEY, '');
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

/**
 * Consulta o saldo do cartão passado como parâmetro
 * @param {Number} card Número do cartão sodexo
 * @param {Number} cpf Número do CPF do titular
 * @return {Promise}
 */
exports.saldo = function (card, cpf) {
  return new Promise((resolve, reject) => {
    if (!card) throw('[sodexo] Missing card param');
    if (!cpf) throw('[sodexo] Missing cpf param');

    let req = encrypt(`th=thsaldo&cardNumber=${card}&document=${cpf}`);

    unirest('POST', 'https://www.app.sodexo.com.br/PMobileServer/Primeth')
      .send({'th': 'thsaldo', 'req': req})
      .end(res => {
        if (res.error) throw(res.error);
        resolve(res.body);
      });
  });
};
