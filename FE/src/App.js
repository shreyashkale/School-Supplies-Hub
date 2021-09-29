import './App.css';

import React , { useState} from "react";
import ProductRegister from './components/ProductRegister';
import NavigationBar from './components/NavigationBar'
import ProductDescription from './components/ProductDescription'
import Home from './components/Home'
import Footer from './components/Footer';
import Myproducts from './components/Myproducts'
import Myorders from './components/Myorders';
import Register from './components/Register';
import Login from './components/Login';
import Alert from './components/Alert';
import SearchProduct from './components/SearchProduct';
import CityProduct from './components/CityProduct';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect ,useHistory
  
} from "react-router-dom";
import CategoryProduct from './components/CategoryProduct';
import CategoryState from './contexts/category/CategoryState';

function App() {
  const [currentProduct, setcurrentProduct] = useState(null)
  const history = useHistory();

  const [alert, setAlert] = useState(null);


  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }
  // const logout= () =>{
  //   console.log(
  //     "inside"
  //   )
    
  //   console.log("user is ->",sessionStorage.getItem("user") );
  //   sessionStorage.removeItem("user");
  //   console.log("user after ->",sessionStorage.getItem("user") );
  //   history.push('/');
  // }
 
  
  return (
    <CategoryState>
  <Router>
      
     <NavigationBar  /> 
     <Alert alert={alert}/>
      <Switch>
          <Route exact path="/login">
          <Login showAlert={showAlert}/>
          </Route> 
          <Route exact path="/">
            <Home setcurrentProduct={setcurrentProduct}/>
          </Route>
          <Route exact path="/register">
           <Register showAlert={showAlert}/>
          </Route>
          <Route exact path="/my-orders">
          {localStorage.getItem('user')==null? <Redirect to='/login'/>:<Myorders/>}
          </Route>
          <Route exact path="/my-products">
          {localStorage.getItem('user')==null? <Redirect to='/login'/>:<Myproducts showAlert={showAlert}/>  }        
          </Route>
          <Route exact path="/product-description">
          {localStorage.getItem('user')==null? <Redirect to='/login'/>:<ProductDescription currentProduct={currentProduct}/> }       
          </Route>
          <Route exact path="/product-register">
          {localStorage.getItem('user')==null? <Redirect to='/login'/> :<ProductRegister showAlert={showAlert}/>}
          </Route>
          <Route exact path="/search-product/:query">
            <SearchProduct setcurrentProduct={setcurrentProduct}/>
          </Route>
          <Route exact path="/category-product/:query/:category">
            <CategoryProduct setcurrentProduct={setcurrentProduct}/>
          </Route>
          <Route exact path="/city-product/:query">
            <CityProduct setcurrentProduct={setcurrentProduct}/>
          </Route>
        </Switch> 
    
    <Footer/>
     

    </Router>
    </CategoryState>
  );
}

export default App;
