# ShowCNPJ - Consulta de CNPJs em React Native (Expo)

Uma aplicação simples em **React Native** utilizando **Expo** que permite consultar dados de CNPJs através de uma API local que busca dados em uma API pública. Possui splash screen inicial, validação de CNPJ e exibe as informações detalhadas da empresa.

---

## Funcionalidades

- Splash screen personalizada ao iniciar o app.
- Campo de input para digitar o CNPJ.
- Validação básica do CNPJ (14 números).
- Requisição à API local (`http://localhost:4000/cnpj/{cnpj}`).
- Exibição dos dados do CNPJ:
  - Nome, Fantasia, Abertura, Situação, Tipo, Porte, Natureza Jurídica.
  - Atividade Principal.
  - Endereço completo e CEP.
  - Data da situação.
- Tratamento de erros e feedback visual.

---

## Pré-requisitos

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- API local rodando em `http://localhost:4000` com endpoint `/cnpj/{cnpj}`.

---

## Instalação

1. Clone o repositório:

- bash:
- `git clone <URL_DO_REPOSITORIO>`
- `cd nome-do-repositorio`

---

## Rode no bash
- `npm i`
- `npm run start:all`
