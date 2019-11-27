# ESTE PACOTE NÃO FUNCIONA MAIS!

# sodexo
Módulo não oficial para consulta de saldo dos cartões sodexo.

## Instalação
```
$ npm i --save sodexo
```

## Uso

```javascript
const sodexo = require('sodexo');

// passe como parâmetros o número do cartão e o cpf do titular
sodexo.saldo(cartao, cpf)
  .then((res) => {
    console.log(res);
  });
```
* Este módulo precisa das variáveis de ambiente `SODEXO_ENCRYPT_ALGORITHM` e `SODEXO_ENCRYPT_KEY` para funcionar. Caso você precise dos valores para setar nestas variáveis, envie um e-mail para micael.souza@outlook.com

## Microservice
Se você precisar dos dados via requisições HTTP, use o [microservice REST][0].
```http
POST  HTTP/1.1
Host: sodexo.now.sh
Content-Type: application/json

{
	"card": "0000000000000000",
	"cpf": "00000000000"
}
```

## Licença
MIT

[0]:https://github.com/sodexounofficial/sodexo-microservice
