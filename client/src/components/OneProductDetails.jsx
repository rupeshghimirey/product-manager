import React , {useEffect, useState} from 'react';
import { useParams } from "react-router";
import axios from 'axios'
import {
    Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";


const OneProductDetails = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState({})
    const history = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(response=>{
            console.log("RESPONSE WHEN TRYING TO GET DETAILS ABOUT ONE Product-->", response)
            setProductDetails(response.data.results)
        })
        .catch(err=>console.log(err))
    },[])

    const deleteClickHandler = ()=>{
        console.log("trying to delete product with this id-->", productDetails._id )
        axios.delete(`http://localhost:8000/api/products/delete/${productDetails._id}`)
            .then(res=>{
                console.log("response after axios delete-->", res)
                history.push("/")

            })
            .catch(err=>console.log("errrrrr when deleting-->", err))
    }
    


    return (
        <div>
            <div className="text-center">
                <Link className="btn btn-dark mt-3" to={`/products/edit/${productDetails._id}`}>Edit Product</Link>
            </div>
            <div className="col-lg-6 offset-lg-3 border border-dark mt-3">
                <h3 className="text-dark bg-success">Showing One Product details below!</h3>
                <h4><span className="text-danger">Title:</span> {productDetails.title}</h4>
                <h4> <span className="text-danger ">Price:</span> {productDetails.price}</h4>
                <h4><span className="text-danger ">Description</span> {productDetails.description}</h4>
                <p><button onClick = {deleteClickHandler} className="btn btn-primary mt-4">Delete {productDetails.title}</button></p>
            </div>
        </div>
    );
};



export default OneProductDetails;
