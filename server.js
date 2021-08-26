const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const { validate, getAddressInfo } = require('bitcoin-address-validation');
var bitcore = require('bitcore-lib');
var Message = bitcore.Message;

app.use(express.json())
const users=[]

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try{
        const hashedPw = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPw}
        users.push(user)
        res.status(201).send()
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

