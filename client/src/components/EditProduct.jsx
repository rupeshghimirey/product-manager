import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import axios from 'axios'
import { useHistory } from "react-router-dom";


const EditProduct = () => {
    const { productId } = useParams();
    const history = useHistory(); //this is for redirecting when we submit the form

    const [formInfo, setFormInfo] = useState({
        title:"",
        price:"",
        description:"",
    })

    const [formErrors, setFormErrors] = useState({
        title:"",
        price:"",
        description:"",
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${productId}`)
            .then(res=>{
                console.log("response when trying to update one product-->", res)
                setFormInfo(res.data.results)
                setFormErrors(res.data.err.errors)
            })
            .catch(err=>console.log("errrrr when editing the product ", err))
    },[])


    const changeHandler = (e)=>{
        console.log("changin something")
        console.log(e.target.name, e.target.value)
            setFormInfo({ 
                ...formInfo,
                [e.target.name]:e.target.value
            })
        }

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${productId}`, formInfo )
            .then(response=>{
                console.log("response afer put request", response)
                if(response.data.err){ //if the form is not filled out properly
                    setFormErrors(response.data.err.errors)
                } else {
                    // props.setFormSubmitted(!props.formSubmitted)
                    setFormInfo({
                        title:"",
                        price:"",
                        description:"",
                        
                    })

                    setFormErrors({
                        title:"",
                        price:"",
                        description:"",    
                    })
                    history.push(`/products/${productId}`);
                }
                
            })
            .catch(err=> console.log("errrrr, ", err))
    }


    return (
        <div>
            <form onSubmit= {submitHandler}>
                <div className="form-group col-lg-6 offset-lg-3 mt-3">
                    <label htmlFor="">Title:</label>
                    <input onChange={changeHandler} type="text" name="title" id="" className="form-control" value = {formInfo.title} />
                    <p className="text-danger">{formErrors.title?.message}</p>
                </div>
                <div className="form-group col-lg-6 offset-lg-3 ">
                    <label htmlFor="">Price:</label>
                    <input onChange={changeHandler} type="number" name="price" id="" className="form-control" value = {formInfo.price} />
                    <p className="text-danger">{formErrors.price?.message}</p>
                </div>
                <div className="form-group col-lg-6 offset-lg-3 ">
                    <label htmlFor="">Description:</label>
                    <input onChange={changeHandler} type="text" name="description" id="" className="form-control" value = {formInfo.description}/>
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <input type="submit" value="Edit Product!" className="btn btn-danger mt-3" />

            </form>
        </div>
    );
};


export default EditProduct;