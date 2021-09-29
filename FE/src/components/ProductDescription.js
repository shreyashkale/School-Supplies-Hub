import React, { useEffect, useState } from "react";

export default function ProductDescription(props) {
  const [product, setproduct] = useState({
    productId: "",
    user: {
        userId: "",
        userType: "",
        userName: "",
        email: "",
        mobileno: "",
    },
    productName: "",
    discription: " ",
    category: {
        id: 1,
        category: "",
    },
    price: "",
    image: "",
    isSold: "",
    date: "",
    city: "",
    tags: ""
});
  const update = async () => {
    let data = await fetch(
      `http://localhost:8085/product-api/product/${props.currentProduct}`
    );
    
    let parsedData = await data.json();
    setproduct(await parsedData);
    // let user=product.user;
    console.log("Productdiscription"+product.user.userName);

  };

  useEffect(() => {
    update();

  }, []);
  return (
    <>
      {product && (
        <div className="container my-5 shadow" >
          <div className="card mb-3 px-2 py-2" style={{border:"none"}}>
            <div className="row g-0">
              <div className="col-md-7">
                <img
                  src="https://rukminim1.flixcart.com/image/416/416/k4rcmfk0/bag/g/h/h/za75-lcky-school-bags-2020-luis-paul-20-original-imafffy8ycczsjxf.jpeg?q=70"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-5">
                <div className="card-body mx-4">
                  <h1 className="card-title">Rs. {product.price} </h1>
                  <small className=" text-muted my-2">
                    {new Date(product.date).toUTCString()}
                  </small>
                  <p className="card-text my-2">
                    {product.tags && product.tags.split(";").map((e) => {
                      return (
                        <span
                          className="badge badge-primary mx-1"
                          style={{ color: "white", backgroundColor: "grey" }}
                        >
                          {e}
                        </span>
                      );
                    })}
      
                  </p>
                  <div my-5 >
                  <b>Seller Description : </b> 
                  <div className=" text-center bg-light my-2 py-3 shadow ">
                    
                    <h4><i className="bi bi-person-fill mx-1"></i> {product.user.userName}</h4>
                  <h5>{product.user.email}</h5>
                  <h5><i class="bi bi-telephone-fill"></i>{product.user.mobileno}</h5>
                  <br />
                  </div>
                  </div>
                </div>
              </div>
              <p className="card-text my-2">{product.discription}</p>
            </div>
            <div className="text-center my-2">
              <button type="button" className="btn btn-primary ">
                Buy Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
