const express = require('express');
const productRouter = express.Router()

const Container = require('../Container')
const productsContainer = new Container('./data/products.json')


productRouter.get('/', async (req, res) =>{
  const products = await productsContainer.getAll()
  res.send({
    message: 'sucess',
    data: products
  })
})

productRouter.get('/:id', async (req, res) => {
  
  const productId = parseInt(req.params.id)
  const product = await productsContainer.getById(productId)

  res.send({
    message: 'sucess',
    data: product
  })
})

productRouter.post('/', async (req, res) => {
  const newProduct = req.body
  const idProductSaved = await productsContainer.save(newProduct)
  
  res.send({
    message: 'sucess',
    ...newProduct,
    id: idProductSaved
  })
})

productRouter.put('/:id', async (req,res) => {
  const productId = parseInt(req.params.id)
  const product = req.body
  const productUpdated = await productsContainer.update(productId, product)

  if(!productUpdated) {
    res.send({
      message: 'operation wrong!! :c',
      data: productUpdated
    })
  }else {
    res.send({
      message: 'operation successful',
      data: productUpdated
    })
  }
})

productRouter.delete('/:id', async (req, res) =>{
  const productId = parseInt(req.params.id)
  const productEliminated = await productsContainer.deleteById(productId)

  if(!productEliminated) {
    res.send ({
      message: 'operation wrong!! :c',
      data: productEliminated
    })
  } else {
    res.send({
      message: 'operation succesful',
      data: productEliminated
    })
  }
})


module.exports = productRouter;