# NyssaBot

A Nyssa Bot é um bot desenvolvida em Discord.js v14 que utiliza Slash Commands(/). Ela foi desenvolvida para proporcionar uma experiência mais fácil e rápida para o seu servidor Discord.

## Site

A Nyssa Bot agora tem um site onde você pode encontrar informações sobre o bot, documentação e muito mais: [https://nyssabot.pages.dev/](https://nyssabot.pages.dev/)

## Funcionalidades

O Bot possui as seguintes funcionalidades:

- Comandos de diversão
- Comandos de utilidades
- Comandos de economia
- Comandos de gifs de animes (exemplo: abraço, tocaaqui)
- Comandos de moderação

## Requisitos

Antes de instalar o bot, verifique se você possui os seguintes requisitos:

- Node.js v18 ou superior
- NPM (Node Package Manager)
- Discord.js V14

## Instalação

Para instalar o bot, siga os seguintes passos:

1. Clone este repositório:

```
git clone https://github.com/Nyssa-Bot/NyssaBot
```

2. Instale as dependências necessárias:
```
cd NyssaBot/
npm install
```

3. Configure as suas credenciais do Discord no arquivo `.env.example` com o token do seu bot e mude o nome de `.env.example` para `.env`. E adicione seu ID no aquivo ".env" e crie dois webhooks um canal para o log de comandos e o outro para logs de servidores adicionados, por fim adicione no arquivo "index.js".

4. Inicie o bot utilizando o comando:
```
node .
```

### Comandos Linux

Se você estiver usando Linux, instale os pacotes usando:
```
sudo apt update -y && sudo apt upgrade -y && sudo apt install git nodejs nano -y
```

### Windows

Se você estiver usando Windows, baixe e instale o [Git](https://git-scm.com/downloads) e o [Node.js](https://nodejs.org/en/) antes de executar os seguintes comandos e adicione seu token antes de usar o "node ." Não se esqueça de configurar o arquivo ".env.exemple" e renomear para ".env".

## Bot sempre online

Hospede o bot em uma [VPS](https://rockcontent.com/br/blog/vps/) como [Oracle Cloud Modo Gratuito](https://www.oracle.com/br/cloud/free/) ou [Linode](https://www.linode.com/pricing/) com preços de "Shared CPU" de 5 dólares (1gb de Ram), outra opção são as plataformas de desenvolvimento como a [Codesandbox](https://codesandbox.io/) (2 cpu e 2gb de ram) ou em servidores de hospedagem especifico para bots discord, como a [Square Cloud](https://squarecloud.app/) (? cpu e 128mb de ram).

## Comandos

Para utilizar os comandos do bot, digite `/` na caixa de texto do chat do Discord. Use `/ajuda` para ver a lista completa de comandos disponíveis.

## Personalização

Adicione seu ID no aquivo ".env", crie um webhook em um canal para o log de comandos e adicione no arquivo ".env".

## FAQ

Veja nosso FAQ em [NyssaBot FAQ](https://nyssabot.pages.dev/#faq).

## Agradecimentos

Eu gostaria de agradecer o [Ferinha](https://www.youtube.com/@OFerinha), que me ajudou ensinando em seus vídeos a programar os comandos da bot. E ao desenvolvedor [GeovaneDev](https://github.com/GeovaneDev).

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Se você encontrar bugs ou problemas, por favor, abra uma issue. Se você quiser contribuir com código, crie um pull request.

## Licença

Este projeto é licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.
