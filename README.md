Desafio Front-End
===================


O desafio
-------------

Não é permitido o uso de nenhuma biblioteca ou framework externo. Tudo será feito com [Vanilla.js](http://vanilla-js.com/).
Não utilize nenhuma biblioteca de CSS externa, mas você pode utilizar qualquer metodologia de arquitetura de código.
Se preferir, o uso de Sass é liberado, contanto que seu uso seja justificável.

O objetivo desse teste é avaliar:
- organização;
- semântica;
- uso e abuso das features das linguagens (HTML, CSS e JS);
- uso de patterns;

# Pré-requisitos

Verifique se voce possui o Node.js instalado. Será usado para subir a aplicação e servir o JSON disponibilizado.
* Node.js - [Download and install Node.js](https://nodejs.org/en/download/);

Instalação rápida

O primeiro passo será instalar as dependências do Node.js, usando npm. No diretorio da aplicação, digite na **linha de comando**:

> $ npm install:

## Executando
   Para executar no servidor:

> $ npm start

  Para acessar, entre em localhost, porta 3001.

## Estrutura

A estrutura básica do desafio fica da seguinte maneira:

* `frontend-test-master/`Contem todo o código fonte do desafio.
* `node_modules/` Contem as dependências via [NPM](https://www.npmjs.org/). Entretanto o diretório não é versionado, é ignorado.
* `public/` Contem todos os arquivos estáticos da applicação, este é o local onde ficam todos os arquivos do front-end.
* `schema/` Contem o arquivo json disponibilizado para montar o formulario
* `.gitignore` O arquivo .gitignore especifica intencionalmente os arquivos que deverão ser ignorados pelo git.
* `package.json` Lista todos as dependências [Node.js](http://nodejs.org/) .
* `README.md` Explicação de todo o funcionamento da aplicação.
