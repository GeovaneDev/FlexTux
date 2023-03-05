# Starnick

A Starnick (ou Star) é um bot Discord.js v14 que utiliza Slash Commands(/). Ela foi desenvolvida para proporcionar uma experiência mais fácil e rápida para o seu servidor Discord.

## Site

Agora a Star tem um site: [Clique aqui](https://starnick.netlify.app/).
Utilizamos o templete: [Templete](https://github.com/Hadi-koubeissi/Discord-bot-website-template). 
Mas futuramente prentedemos criar um site com as explicações da Star e também um painel de controle.

## Funcionalidades

O Bot possui as seguintes funcionalidades:

- Comandos de diversão
- Comandos de utilidades
- Comandos de gifs de animes(exemplo: abraço, tocaaqui)
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

3. Configure as suas credenciais do Discord no arquivo `.env.example` com o token do seu bot e mude o nome de `.env.example` para `.env`.

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
nano .env.example
mv .env.example .env
node .
```

### Comandos Windows

Se você estiver usando Windows, baixe e instale o [Git](https://git-scm.com/downloads) e o [Node.js](https://nodejs.org/en/) antes de executar os seguintes comandos e adicine seu token antes de usar o "node ." adicione seu token no arquiv `.env.example` e mude o nome de `.env.example` para `.env`:

```
git clone https://github.com/GeovaneDev/Starnick
cd Starnick/
npm install
node .
```

## Comandos

Para utilizar os comandos do bot, digite `/` na caixa de texto do chat do Discord. Use `/ajuda` para ver a lista completa de comandos disponíveis.

## Personalização

Altere em alguns comandos de diversão na pasta "comandos/animesgifs" e adicione o seu id no comando de "beijar.js" ou "/beijar", para o comando funcionar perfertamente.

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Se você encontrar bugs ou problemas, por favor, abra uma issue. Se você quiser contribuir com código, crie um pull request.

## Licença

Este projeto é licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.
