# Starnick

A Starnick (ou Star) é um bot Discord.js v14 que utiliza Slash Commands(/). Ela foi desenvolvida para proporcionar uma experiência mais fácil e rápida para o seu servidor Discord.

## Funcionalidades

O Bot possui as seguintes funcionalidades:

- Comandos de economia
- Comandos de diversão
- Comandos de utilidades
- Comandos de moderação

## Requisitos

Antes de instalar o bot, verifique se você possui os seguintes requisitos:

- Node.js v18 ou superior
- NPM (Node Package Manager)

## Instalação

Para instalar o bot, siga os seguintes passos:

1. Clone este repositório:

```
git clone https://github.com/GeovaneDev/Starnick
```

2. Instale as dependências necessárias:

```
cd Starnick/
npm install
```

3. Configure as suas credenciais do Discord no arquivo `config.json` com o token do seu bot.

4. Inicie o bot utilizando o comando:

```
node .
```

### Comandos Linux

Se você estiver usando Linux, execute os seguintes comandos:

```
sudo apt update -y && sudo apt install nodejs nano git -y
git clone https://github.com/GeovaneDev/Starnick
cd Starnick/
npm install
nano config.json
node .
```

### Comandos Windows

Se você estiver usando Windows, baixe e instale o [Git](https://git-scm.com/downloads) e o [Node.js](https://nodejs.org/en/) antes de executar os seguintes comandos e adicine seu token antes de usar o "node . " no arquivo "config.json":

```
git clone https://github.com/GeovaneDev/Starnick
cd Starnick/
npm install
node .
```

## Comandos

Para utilizar os comandos do bot, digite `/` na caixa de texto do chat do Discord. Use `/ajuda` para ver a lista completa de comandos disponíveis.

## Personalização

Para personalizar o bot, você pode alterar o ID do dono no arquivo `comandos/admin/setstatus.js` e nos arquivos `comandos/economy/addmoney.js` e `comandos/economy/removemoney.js`.

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Se você encontrar bugs ou problemas, por favor, abra uma issue. Se você quiser contribuir com código, crie um pull request.

## Licença

Este projeto é licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.
