'use strict';

const crypto = require('crypto');
const unirest = require('unirest');

const algorithm = process.env.SODEXO_ENCRYPT_ALGORITHM;
const key = process.env.SODEXO_ENCRYPT_KEY;

function encrypt (text) {
  var cipher = crypto.createCipheriv(algorithm, key, '');
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

exports.saldo = function (card, cpf) {
  return new Promise((resolve, reject) => {
    if (!card || !cpf) throw('[sodexo] Você precisa informar o número do cartão e o cpf do usuário!');

    let req = encrypt(`th=thsaldo&cardNumber=${card}&document=${cpf}`);

    unirest('POST', 'https://www.app.sodexo.com.br/PMobileServer/Primeth')
      .send({'th': 'thsaldo', 'req': req})
      .end(res => {
        if (res.error) throw(res.error);
        resolve(res.body);
      });
  });
};
