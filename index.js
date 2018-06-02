const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const users = require('./models/users');
const app = express();
const User = mongoose.model('users');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(keys.mongoURI);

app.get('/api/userdata', (req, res) => {
    User.find((err, data) => {
        err ? res.send(err) : res.send(data)
    });
});

app.post('/api/adduser', (req, res) => {
    let newUser = new User(req.body);
    newUser.save((err, data) => {
        err ? res.send(err) : res.send({data : 'Data Added Successfully'})
    });
});

app.post('/api/deluser', (req, res) => {
    User.remove({ _id: req.body.id }, (err, data) => {
        err ? res.send(err) : res.send({data: 'Deleted User'})
    });
});

app.post('/api/edituser', (req, res) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email
    }, (err, data) => {
        err ? res.send(err) : res.send({data: 'Updated User'})
    });
});

app.listen(3001, () => console.log('Server is Running'));
