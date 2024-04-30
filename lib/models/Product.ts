import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: String,
  description: String,
  media: [String],
  category: String,
  collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  sizes: [String],
  colors: [String],
  price: { type: Schema.Types.Decimal128, get: (v: mongoose.Types.Decimal128) => { return parseFloat(v.toString()) }},
  expense: { type: Schema.Types.Decimal128, get: (v: mongoose.Types.Decimal128) => { return parseFloat(v.toString()) }},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true } });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
