# Meraki Callback Demo

A simple app to demonstrate callbacks with the Meraki API. 


The app makes an API request to Meraki, providing a callback URL to this app.
Once the request has completed, Meraki sends a webhook to the callback URL and the results are displayed on the web page. Websockets are used to enable the front-end app to communicate with the backend server. The communication with Meraki is provided by the Meraki REST API and exposing a REST endpoint to receive webhook posts from Meraki 

<img src="./screenshots/livetools-callbacks-demo.gif" width=80%/>


# Setup

The NodeJS app uses an express server to provide the webhook listener and front-end VueJS web app. 

## Install
```
npm install
```


## Start (with tunnel)
```
API_KEY=<YOURAPIKEY> npm start
```


## Manually Expose the app to the internet with secure tunnel for dev testing

```
API_KEY=<YOURAPIKEY> node server.js -t
```

*or use your own tunnel service*

```
ngrok http 3005
https://c228-86-84-117-000.eu.ngrok.io/ 
```

```
~/telebit http 3005
> Forwarding https://massive-falcon-XXX.telebit.io => localhost:3005
```



