import React,{useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";

const AllProducts = (props) => {

    const [allProducts, setAllProducts] = useState([])

    const [deleteToggle, setDeleteToggle] = useState(false)

    useEffect(()=>{
        axios.get("http://localhost:8000/api/products")
        .then(response=>{
            console.log("response when getting all products-->", response)
            setAllProducts(response.data.results)
        })
        .catch(err=>console.log("Error while getting all products!", err))

    },[props.formSubmitted, deleteToggle])

    const deleteProduct = (productId) => {
        console.log("Here is the ", productId)
        axios.delete(`http://localhost:8000/api/products/delete/${productId}`)
            .then(res=>{
                console.log("response after axios delete-->", res)
                setDeleteToggle(!deleteToggle)
            })
            .catch(err=>console.log("errrrrr when deleting from homePage-->", err))
    }
    

    return (
        <div>
            <h1 className="text-primary mt-3 bg-dark col-lg-6 offset-lg-3">List of All Products!</h1>
            {
                allProducts.map((product,i)=>{
                    return (
                        <div key = {i} className="card col-lg-6 offset-lg-3">
                            <div className="card-body mt-3">
                                <h4 className="card-title"><Link to={`/products/${product._id}`}>{product.title}</Link></h4>
                            </div>
                            <p><button onClick= {(e)=>deleteProduct(product._id)} className="btn btn-danger mt-2">Delete {product.title}</button></p>

                        </div>
                    )
                })
            }
        </div>
    );
};

export default AllProducts;