const express = require('express');
const router = express.Router()
const  product_postTemplateCopy = require('../models/Product')

//Product Upload Router
router.post('/product', async(request, response) => {

    const uploaded_product = new product_postTemplateCopy({
        productName: request.body.productName,
        description: request.body.description,
        img: request.body.img,
        price: request.body.price,
        quantity: request.body.quantity
    })
    uploaded_product.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

module.exports = router