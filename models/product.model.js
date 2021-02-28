const mongoose = require("mongoose");

const rating_schema = new mongoose.Schema({
  ratingValue: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  ratingCount: {
    type: Number,
    default: 0,
    required: true,
  },
});

const offer_schema = new mongoose.Schema({
  offerPrice: {
    type: Number,
    required: true,
  },
  TnC: [
    {
      type: String,
      required: true,
    },
  ],
  validUntil: {
    type: Date,
    required: true,
  },
  spec: {
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    specType: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
  },
});

const product_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "INR", "EUR"],
      required: true,
    },
  },
  availibility: {
    type: mongoose.Schema.Types.Mixed,
    default: "NA",
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller_details",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  brand: {
    type: String,
  },
  rating: {
    type: rating_schema,
  },
  offer: {
    type: offer_schema,
  },
});
module.exports = mongoose.model("product_details", product_schema);
