GestaoLaboratorial

Este projeto foi realizado inicialmente para a materia de Qualidade e teste de software e foram utilizadas a suite de servi�os do firebase. Para a mat�ria de t�picos avan�ados em computa��o esse projeto foi migrado para a AWS, utilizando os servi�os: Amazon Cognito, Amazon Dynamodb, Amazon Lambda e Amazon S3.

Aten��o, atualmente o projeto est� configurado para utilizar a minha conta da AWS.

Antes de realizar qualquer coisa na aplica��o angular tem que instalar as suas depedencias utilizando o npm install.

Para rodar a aplica��o localmente: Rode o comando o ng serve e v� at� http://localhost:4200/.

Para gerar a build: Rode o comando ng build para realizar a build e ser� gerada a pasta dist/ com os arquivos estaticos. Esses arquivos s�o os que v�o ser enviados para o S3.

Para subir as functions no lambda: V� at� a pasta aws_lambdas cd aws_lambdas, instale o claudia npm install claudia e depois rode o comando claudia create --handler lambda.handler --deploy-proxy-api --region us-east-1 --policies .\policy.json para subir uma nova function. E para realizar a atualiza��o basta dar um claudia update. Tem a op��o de rodar as functions localmente tamb�m, para isso tem que instalar as depedencias utilizando o npm install e depois node .\app.js.