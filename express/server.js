import express from 'express';
const server = express();
import Container from './container.js';

const PORT = 8080;
const container = new Container('./products.txt');

server.get('/',(req, res, next) =>{
  res.send('<h1 style="color: #212121;">Welcome to Express Server</h1>')
});

server.get('/productos',(req,res,next) => {
  container.getAll().then(obj => res.send(obj))
});

server.get('/productoRandom',(req,res,netx) => {
  container.getAll().then(obj => container.getById(Math.floor(Math.random() * obj.length+1)).then( cont => res.send(cont)))
});

server.listen(PORT, () =>{
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

const getProducts = async() =>{
  
}