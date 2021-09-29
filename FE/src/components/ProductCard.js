import React from 'react';
import {useHistory} from "react-router-dom";

function ProductCard(props) {
  const history = useHistory();
  const handleClick = () =>{
    props.setCurrentProduct(props.product.productId);
    localStorage.getItem("user")==null?history.push('/login'):history.push('/product-description');
  }
    return (
        
            <div>
      <div className="card my-3 mx-3 shadow" style={{borderRadius:"1.15rem"}}>
      <img src="https://rukminim1.flixcart.com/image/416/416/k4rcmfk0/bag/g/h/h/za75-lcky-school-bags-2020-luis-paul-20-original-imafffy8ycczsjxf.jpeg?q=70" className="card-img-top" style={{borderRadius:"1.15rem,1.15rem,0,0"}} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.product.productName}</h5>
          <p className="card-text">
          {props.product.category.category} - {props.product.price} 
          </p>
          <p className="text-muted"><small>{new Date(props.product.date).toUTCString()}</small></p>
          <button onClick={handleClick} className="btn btn-primary">
            View Product
          </button>
        </div>
      </div>
    </div>
        
    )
}

export default ProductCard
