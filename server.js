const express = require('express');
const mongoose = require('mongoose');

// DON'T HARDCODE connection string here, read it from process.env
const connectionString = "mongodb+srv://bz:bz@cluster0-li9qp.mongodb.net/meanauth?retryWrites=true&w=majority";
const dbOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, auto_reconnect: true };
mongoose.connect(connectionString, dbOptions);
mongoose.connection.on('connected', function () {
    console.log("Connected to DB");
});
mongoose.connection.on('error', function (err) {
    console.log("Error while connecting to DB: " + err);
});

const app = express();
app.use(express.static(__dirname+'/dist/meanAuth'));
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log("Server started...") });