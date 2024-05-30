const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const request = require('request');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);

const commander = require('commander');
commander
  .usage('[OPTIONS]...')
  .option('-t, --tunnel', 'Run a dynamic public encrypted tunnel')
  .parse(process.argv);
const options = commander.opts();


// HTTP endpoint for pinging a device
app.post('/callbackDemo/pingDevice', (req, res) => {
  const { serial, count, callback } = req.body;
  const apiKey = process.env.API_KEY;
  const options = {
    url: `https://api.meraki.com/api/v1/devices/${serial}/liveTools/pingDevice`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    json: {
      count,
      callback
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('pingDevice response: ', body)
      res.send(body);
    }
  });
});

// HTTP endpoint for receiving callbacks
app.post('/callbackDemo/callbackReceiver', (req, res) => {
  const payload = req.body;
  const wsMessage = JSON.stringify(payload);
  console.log('webhook received', payload)
  wss.clients.forEach((client) => {
    client.send(wsMessage); // send payload to all WebSocket clients
  });
  res.send('OK');
});

// Server HTML page from /public directory
app.use(express.static('public'));

// Start server
server.listen(3005, () => {
  console.log('Server listening on port 3005');
});

const wss = new WebSocket.Server({ server });

// WebSocket endpoint
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    ws.send(message); // send back received message
  });
});

// RUN A DYNAMIC TUNNEL

if (options.tunnel) {
  const localtunnel = require('localtunnel');
  (async () => {
    const tunnel = await localtunnel({ port: 3005 });
    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    tunnel.url;
    console.log("Public URL: ", tunnel.url)

    // discover public IP
    axios("https://api.ipify.org?format=json/").then(res => console.log("Your Public IP to be used as a password to access site: ", res.data))    

    tunnel.on('close', () => {
      // tunnels are closed
    });
  })();

  
  
}

