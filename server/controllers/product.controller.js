const Product = require("../models/Product.model")


module.exports.findAllProducts = (req,res)=>{
    Product.find()
        .then(allProducts =>{
            res.json({results: allProducts })
        })
        .catch(err=>res.json({err:err}))
}

module.exports.createProduct = (req,res)=>{
    Product.create(req.body)
        .then(newlyCreatedProduct =>{
            res.json({results: newlyCreatedProduct })
            console.log(newlyCreatedProduct);
        })
        .catch(err=>res.json({err:err}))
}

module.exports.findOneProduct = (req,res)=>{
    Product.findOne({_id:req.params.id })
        .then(foundProduct =>{
            res.json({results: foundProduct })
        })
        .catch(err=>res.json({err:err}))
}

module.exports.updateOneProduct = (req,res)=>{
    Product.findOneAndUpdate(
        {_id:req.params.id }, //locate which Product we want to update
        req.body, //info from the form we using to update the Product with
        {new:true, runValidators:true}
        )
    .then(updatedProduct =>{
        res.json({results: updatedProduct })
    })
    .catch(err=>res.json({err:err}))
}


module.exports.deleteOneProduct = (req,res)=>{
    Product.deleteOne({_id:req.params.id })
        .then(deletedProduct =>{
            res.json({results: deletedProduct })
        })
        .catch(err=>res.json({err:err}))
}