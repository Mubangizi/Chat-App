var express = require("express");
var http = require("http");


// initialise express app
var app =express();

// make app server handle http requests
var server = http.Server(app);
var io =require("socket.io")(server);

server.listen(3333, function(){
    console.log("The Dev server is running at 3333");
});

app.get("/", function(_req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
    console.log("User has connected");

    socket.on("disconnect", function(){
        console.log("User has disconnected");
    })
});