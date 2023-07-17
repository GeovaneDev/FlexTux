# NyssaBot

A Nyssa Bot é um bot desenvolvida em Discord.js v14 que utiliza Slash Commands(/) e Prefix(!). Ela foi desenvolvida para proporcionar uma experiência fácil, rápida e eficiente para o seu servidor Discord.

## Site

A Nyssa Bot tem um site onde você pode encontrar informações sobre o bot, documentação e muito mais: [https://nyssabot.pages.dev/](https://nyssabot.pages.dev/)

## Funcionalidades

O Bot possui as seguintes funcionalidades:

- Comandos de diversão
- Comandos de utilidades
- Comandos de economia
- Comandos de gifs de animes (exemplo: abraço, toca aqui)
- Comandos de moderação
- Comandos por prefix(!) (em desenvolvimento)

## Requisitos

Antes de instalar o bot, verifique se você possui os seguintes requisitos:

- Node.js v18 ou superior
- NPM (Node Package Manager)

## Instalação

Para instalar o bot, siga os seguintes passos:

1. Clone este repositório:

```
git clone https://github.com/GeovaneDev/NyssaBot
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

Se você estiver usando Windows, baixe o [Node.js](https://nodejs.org/en/) antes de executar a bot e adicione seu token antes de usar o "node ." Não se esqueça de configurar o arquivo ".env.exemple" e renomear para ".env".

## Bot online para sempre

Hospede o bot em uma [VPS](https://rockcontent.com/br/blog/vps/) como [Oracle Cloud Modo Gratuito](https://www.oracle.com/br/cloud/free/) ou [Linode](https://www.linode.com/pricing/) com preços de "Shared CPU" de 5 dólares (1gb de Ram). Outra opção são as plataformas de desenvolvimento como a [Codesandbox](https://codesandbox.io/) (2 cpu e 2gb de ram).

## Comandos

Para utilizar os comandos do bot, digite `/` na caixa de texto do chat do Discord. Use `/ajuda` para ver a lista completa de comandos disponíveis. Alguns comandos estão disponíveis em prefix (!), ainda estão sendo desenvolvidos.

## FAQ

Veja nosso FAQ em [NyssaBot FAQ](https://nyssabot.pages.dev/#faq).

## Agradecimentos

Eu gostaria de agradecer o [Ferinha](https://www.youtube.com/@OFerinha), que com seus vídeo relacionados a programação tornou possível esse projeto. E ao desenvolvedor [GeovaneDev](https://github.com/GeovaneDev).

## Contribuição

Sinta-se à vontade para contribuir com este projeto! Se você encontrar bugs ou problemas, por favor, abra uma issue. Se você quiser contribuir com código, crie um [Pull Request](https://github.com/GeovaneDev/NyssaBot/pulls) ou crie um [Issues](https://github.com/GeovaneDev/NyssaBot/issues) com sua sugestão.

## Licença

Este projeto é licenciado sob a licença MIT. Para mais informações, consulte o arquivo [LICENSE](https://github.com/GeovaneDev/NyssaBot/blob/main/LICENSE).