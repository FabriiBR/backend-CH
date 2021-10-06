const express = require('express');
const productRouter = require('./routers/products')

const server = express();
const PORT = 8080;

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use('/static', express.static('public'))

server.use(function (req, res, next) {
  next()
})

const middleware = (req, res, next) => {
  next()
}

server.get('/', middleware, (req, res) => {
  res.send({ message: new Date().toLocaleString()})
})

server.use('/api/products', productRouter)

server.use(function (err, req, res , next) {
  res.status(500).send('Something is wrong')
})

server.listen(PORT, () => console.log(`Server run on port: ${PORT}`))
server.on('error', (error) => console.log('Error: ', error ))