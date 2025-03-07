// importing modules
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const hbs = require('hbs');
require("./config/dbconn");
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();

const view = path.join(__dirname, './src/view');
app.use(express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(bodyParser.urlencoded({ extended: false }))


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');
app.set("views", view);


hbs.registerHelper('even', function (index) {
    return index % 2 === 0;
});

const webroute = require("./src/route/webroute")
// app.use("/api", webroute);
app.use("/", webroute);
//default route

app.get ('/admin', (req, res) => {
    res.render('admin');
});

app.get ('/services', (req, res) => {
    res.render('user/services');
});

app.get ('/features', (req, res) => {
    res.render('user/features');
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log('server is running on ', process.env.PORT);
});
