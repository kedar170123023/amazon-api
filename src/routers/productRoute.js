import express from "express";
const router = express.Router();
import Product from "../models/productModel";
import {isAdmin, isAuth} from '../../util';

router.get('/', async (req, res)=>{
  
  const products = await Product.find({});
  res.send(products);
});


router.get('/:id', async (req, res)=>{
  console.log("data req",req.params.id );
  const productId = req.params.id;  
  const product = await Product.findById({_id : productId })
  if(product){
    res.send(product);
  }
  else {
    res.status(404).send({message:"product not found"});
  }
});

router.post('/', async (req, res)=>{

  const product = new Product({
    name          : req.body.name,
    price         : req.body.price,
    image         : req.body.image,
    brand         : req.body.brand,
    category      : req.body.category,
    countInStock  : req.body.countInStock,
    description   : req.body.description,
  });
  try {
    const newProduct = await product.save();
    if(newProduct){
      return res.status(201).send({message : "New Product Created", data : newProduct});
    }

  }
  catch (err){
    return res.status(500).send({message : "Error in creating product"});
  }
});

router.put('/:id', async (req, res)=>{
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if(product){
    product.name          = req.body.name;
    product.price         = req.body.price;
    product.image         = req.body.image;
    product.brand         = req.body.brand;
    product.category      = req.body.category;
    product.countInStock  = req.body.countInStock;
    product.description   = req.body.description;    

    try {
      const updatedProduct = await product.save(); 
      return res.status(201).send({message: "Product Updated", data : updatedProduct});
      
    }
    catch (err){
      return res.status(500).send({message : "error in updating product"});
    }
    
  }
})


router.delete('/:id',isAuth, isAdmin, async (req, res)=>{
  const productId = req.params.id;
  const deletedProduct = await Product.findById(productId);

  if(deletedProduct){
    await deletedProduct.remove();
    res.send({message : "product deleted"});
  }
  else {
    res.send("error in deleteing ")
  }

  }
)



export default router;
