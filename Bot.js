const MessengerBot = require('messenger-bot');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const bot = new MessengerBot({
  accessToken: 'YOUR_ACCESS_TOKEN',
  verifyToken: 'YOUR_VERIFY_TOKEN',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'YOUR_VERIFY_TOKEN') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
});

app.post('/webhook', (req, res) => {
  bot.receiveMessages(req.body);
  res.sendStatus(200);
});

bot.on('message', (payload, message) => {
  // Handle incoming messages here
  if (message.text === 'hello') {
    bot.sendTextMessage(message.sender.id, 'Hello there!');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});￼Enter
