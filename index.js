const express = require('express');
const expressAccessToken = require('express-access-token');
const fs = require('fs');
const moveTo = require('./control');

const app = express();

var actionArray = [
    "UP",
    "DWON",
    "LEFT",
    "RIGHT"
]

const ipCheck = (ip) => {
    let regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(ip);
}

const firewall = (req, res, next) => {
    try {
        let accessToken = fs.readFileSync('./token.txt', 'utf8').trim();
        if(accessToken !== req.params.token) return res.status(403).send('Forbidden');
        if(!ipCheck(req.params.ip)) return res.status(403).send('Not a valid IP');
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send('Forbidden');
    }
};

app.get('/:token/:ip/up',
  expressAccessToken, 
  firewall, 
  (req, res) => {
    moveTo(req.params.ip, actionArray[0]);
    res.send('Action up performed successfully');
});

app.get('/:token/:ip/down',
  expressAccessToken, 
  firewall, 
  (req, res) => {
    moveTo(req.params.ip, actionArray[1]);
    res.send('Action down performed successfully');
});

app.get('/:token/:ip/left',
  expressAccessToken, 
  firewall, 
  (req, res) => {
    moveTo(req.params.ip, actionArray[2]);
    res.send('Action left performed successfully');
});

app.get('/:token/:ip/right',
  expressAccessToken, 
  firewall, 
  (req, res) => {
    moveTo(req.params.ip, actionArray[3]);
    res.send('Action right performed successfully');
});


const PORT = 8080
app.listen(PORT, () => console.log(`app listening at: ${PORT}`));