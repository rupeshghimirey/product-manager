const ProductController = require("../controllers/product.controller")


module.exports = app =>{

    //find all Products
    app.get("/api/products", ProductController.findAllProducts)

    //create new Product
    app.post("/api/products",ProductController.createProduct)

    //find one Product
    app.get("/api/products/:id", ProductController.findOneProduct)

    //update a Product
    app.put("/api/products/:id", ProductController.updateOneProduct)

    //delete a Product
    app.delete("/api/products/delete/:id",ProductController.deleteOneProduct)

    

}