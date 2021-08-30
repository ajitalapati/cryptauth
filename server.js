const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const { validate, getAddressInfo } = require('bitcoin-address-validation');
var bitcore = require('bitcore-lib');
var Message = bitcore.Message;

var msg = new Message('The dude abides');
app.use(express.json())
const users=[]
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
            console.log("you don't own this address")
        }
        
    }
    catch{res.status(500).send()}
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user=> user.name === req.body.name)
    if(user == null){
        return res.status(400).send("User not found")
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        }
        else{
            res.send("Not Allowed In")
        }
    }
    catch{
        res.status(500).send("Can\'t find user")
    }
})

app.listen(3000)

