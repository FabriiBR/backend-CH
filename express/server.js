const express = require("express");
const server = express();
const Container = require('./container.js');

const PORT = 8080;
const container = new Container('./products.txt');

server.get('/',(req, res, next) =>{
  res.send('<h1 style="color: #212121;">Welcome to Express Server</h1>')
});

server.get('/productos',(req,res,next) => {
  try {
    container.getAll().then(obj => res.send(obj))
  }catch(err) {
    res.send("Error " + err)
  }
});

server.get('/productoRandom',(req,res,netx) => {
  try {
    container.getAll().then(obj => res.send(obj[Math.floor(Math.random() * obj.length)]))
  }catch(err) {
    res.send("Error " + err)
  }
});

server.listen(PORT, () =>{
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})