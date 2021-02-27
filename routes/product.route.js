const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

const product = require("../models/product.model");

router.post("/add-products", (req, res) => {
  const new_product = new product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: {
      amount: req.body.price.amount,
      currency: req.body.price.currency,
    },
    availibility: req.body.availibility,
    image: req.body.image,
    seller: ObjectId(req.body.seller),
  });

  if (req.body.brand != null) {
    new_product.brand = req.body.brand;
  }

  if (req.body.offer != null) {
    new_product.offer = {
      offerPrice: req.body.offer.offerPrice,
      TnC: req.body.offer.TnC,
      validUntil: req.body.offer.validUntil,
      spec: {
        value: req.body.offer.spec.value,
        specType: req.body.offer.spec.specType,
      },
    };
  }

  return new_product
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});




router.post("/show-products-added", (req, res) => {
  product
    .find({ seller: req.body.seller })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
