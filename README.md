# GestaoLaboratorial

Este projeto foi realizado inicialmente para a materia de Qualidade e teste de software e foram utilizadas a suite de serviços do firebase. Para a matéria de tópicos avançados em computação esse projeto foi migrado para a AWS, utilizando os serviços: Amazon Cognito, Amazon Dynamodb, Amazon Lambda e Amazon S3. 

**Atenção, atualmente o projeto está configurado para utilizar a minha conta da AWS.**

Antes de realizar qualquer coisa na aplicação angular tem que instalar as suas depedencias utilizando o `npm install`.

## Para rodar a aplicação localmente

Rode o comando o  `ng serve` e vá até `http://localhost:4200/`.

## Para gerar a build

Rode o comando `ng build` para realizar a build e será gerada a pasta `dist/` com os arquivos estaticos. Esses arquivos são os que vão ser enviados para o S3.

## Para subir as functions no lambda

Vá até a pasta aws_lambdas `cd aws_lambdas`, instale o claudia `npm install claudia` e depois rode o comando `claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1 --policies .\policy.json` para subir uma nova function. E para realizar a atualização basta dar um `claudia update`. Tem a opção de rodar as functions localmente também, para isso tem que instalar as depedencias utilizando o `npm install` e depois `node .\app.js`.
