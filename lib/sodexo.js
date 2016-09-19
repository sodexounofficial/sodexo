'use strict';

const unirest = require('unirest');

exports.saldo = (card, cpf) => {
  return new Promise((resolve, reject) => {

    unirest(
      'POST',
      'https://www.app.sodexo.com.br/PMobileServer/Primeth'
    ).send({
      'th': 'thsaldo',
      'cardNumber': card,
      'document': cpf
    }).end(res => {
      if (res.error) {
        reject(res.error);
        return;
      };

      resolve(res.body);
    });

  });
};
