const http = require('http');
const { ShardingManager } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config()

const manager = new ShardingManager('./index.js', { token: process.env.DISCORD_TOKEN, totalShards: 2 });

const servers = {};

manager.on('shardCreate', shard => {
  console.log(`Shard iniciado: ${shard.id}`);
  
  const port = 8000 + shard.id;
  
  servers[shard.id] = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Shard online id: ${shard.id}`);
  }).listen(port);
});

manager.spawn({ timeout: -1 })