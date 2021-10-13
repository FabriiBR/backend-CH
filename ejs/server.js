const express = require('express');
const productAPIRouter = require('./routers/products')
const productRouter = require('./routers/products')

const server = express();
const PORT = 8080;

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.set('view engine', 'ejs')


const middleware = (req, res, next) => {
  next()
}

server.get('/', middleware, (req, res) => {
  res.render('pages/index', {})
})

server.get('/products/form', (req, res) => {
  res.render('pages/form', {})
})

// server.use('/api/products', productAPIRouter)

server.use('/products', productRouter )

server.use(function (err, req, res , next) {
  res.status(500).send('Something is wrong')
})

server.listen(PORT, () => console.log(`Server run on port: ${PORT}`))
server.on('error', (error) => console.log('Error: ', error ))