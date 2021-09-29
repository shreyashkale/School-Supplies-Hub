import React, { useState, useEffect } from "react";

export default function Myorders() {
  var no=0;
  const [orders, setorders] = useState([]);

  const update = async () => {
    const response = await fetch( "http://localhost:8085/orders-api/myorders", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"userId":JSON.parse(localStorage.getItem("user")).userId})
    });

    let parsedData = await response.json();
    console.log(parsedData);
    setorders(await parsedData);
    console.log(orders);
  };

  useEffect(() => {
    update();
  }, []);
  return (
    <div className="mx-5 my-5 px-5 " >
      <h3>My Orders</h3>  
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Seller</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
       
          {orders.map((order) =>{
            no++;
                  return  <tr>
            <th scope="row">{no}</th>
            <td>{order.product.productName}</td>
            <td>{order.product.category.category}</td>
            <td>{order.seller.userName}</td>
            <td>{order.product.price}</td>
            <td>{new Date(order.date).toDateString()}</td>

          </tr>
              })}
        </tbody>
      </table>
      
    </div>
  );
}
