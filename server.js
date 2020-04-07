var express = require("express");
var http = require("http");


// initialise express app
var app =express();

// make app server handle http requests
var server = http.Server(app);
var io =require("socket.io")(server);
var users = [];

server.listen(3333, function(){
    console.log("The Dev server is running at 3333");
});

app.get("/", function(_req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/styles/index.css", function(_req, res){
    res.sendFile(__dirname + "/styles/index.css");
});


io.on("connection", function(socket){
    var name = "";
    // has connected event add username to users list
    socket.on("has connected", function(username){
        name = username;
        users.push(username);
        io.emit("has connected", {username: username, usersList:users});
    });

    socket.on("disconnect", function(){
        users.splice(users.indexOf(name), 1);
        io.emit("has disconnected", {username: name, usersList:users});
    })
    // new message event
    socket.on("new message", function(message){
        io.emit("new message", message);        //sent message to every socket
    });

});