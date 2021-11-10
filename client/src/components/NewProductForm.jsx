import React, {useState} from 'react';
import axios from 'axios'

const NewProductForm = (props) => {

    const [formInfo,setFormInfo] = useState({
        title:"",
        price:"",
        description:"",
        
    })
    const [formErrors, setFormErrors] = useState({
        title:"",
        price:"",
        description:"",
    })

    //changehandler to update the formInfo object with the information from the form as the form is being changed
    const changeHandler = (e)=>{
        console.log("changinn the form!")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }


    //submithandler for when the form submits we send this date to backend to create something new
    const submitHandler = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/products", formInfo)
            .then(response=>{
                console.log(response)
                if(response.data.err){ //if the form is not filled out properly
                    setFormErrors(response.data.err.errors)
                } else {
                    props.setFormSubmitted(!props.formSubmitted)
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
                }
            })
            .catch(err=>console.log("error submitting the post request-->", err))

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
                <input type="submit" value="Create" className="btn btn-danger mt-3" />

            </form>
        </div>
    );
};

export default NewProductForm;