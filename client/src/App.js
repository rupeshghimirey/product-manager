import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import AllProducts from './components/AllProudcts';
import NewProductForm from './components/NewProductForm';
import OneProductDetails from './components/OneProductDetails';
import EditProduct from './components/EditProduct';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  return (
    <>
      <BrowserRouter>
        <div className="App container">
          <div className="text-center">
            <Link className="btn btn-info mt-3" to="/">Home</Link>
          </div>
          <Switch>
            <Route exact path="/">
            <NewProductForm formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></NewProductForm>
            <hr />
            <AllProducts formSubmitted={formSubmitted}></AllProducts>
            </Route>
            <Route exact path= "/products/:id">
                <OneProductDetails></OneProductDetails>
            </Route>
            <Route exact path= "/products/edit/:productId">
                <EditProduct></EditProduct>
            </Route>


          </Switch>
          


        </div>


      </BrowserRouter>

    </>

  );
}

export default App;
