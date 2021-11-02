const express = require('express')
const app = express()

var bitcore = require('bitcore-lib');
var Message = bitcore.Message;

var msg = new Message('The dude abides');
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const btcaddr = []

app.get('/btcaddr', (req, res) => {
    res.json(btcaddr)
})

app.post('/btcaddr', async (req, res) => {
    try{
        if(msg.verify(req.body.addr, req.body.sig)){
            const user = {addr: req.body.addr}
            btcaddr.push(user)
            res.status(201).send()
        }
        else{
            res.send("You don't own this address")
        }
        
    }
    catch{res.status(500).send()}
})

app.post('/btcaddr/login', async (req, res) => {
    const user = btcaddr.find(user=> user.addr === req.body.addr)
    if(user == null){
        return res.status(400).send("User not found")
    }
    try{
        if(await msg.verify(user.addr, req.body.sig)){
            res.send('Success')
        }
        else{
            res.status(500).send("Not Allowed In")
        }
    }
    catch{
        res.status(500).send("Can\'t find user")
    }
})

app.listen(3000)
