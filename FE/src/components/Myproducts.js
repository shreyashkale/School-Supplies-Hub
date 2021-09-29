import React, { useState, useEffect, useRef } from "react";

export default function Myproducts(props) {
  var no=0;
  const [products, setproducts] = useState([]);
  const [productToEdit, setproductToEdit] = useState({
    productName: "",
    category: { category: "" },
    price: "",
    isSold: null,
  });

  const ref = useRef(null);
  const refClose = useRef(null);
  const showModal = (product) => {
    ref.current.click();
    setproductToEdit({
      productName: product.productName,
      category: product.category,
      price: product.price,
      isSold: product.isSold,
    });
  };
  const removeProduct = async (id) => {
    let data = await fetch(
      `http://localhost:8085/product-api/removeProduct/${id}`,
      { method: "DELETE" }
    );

    let parsedData1 = await data;
    console.log(await parsedData1);
    await update();
    if (data.ok) {
      props.showAlert("Product Deleted successfully", "success");
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };

  const update = async () => {
    const response = await fetch(
      "http://localhost:8085/product-api/myproducts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem("user")).userId,
        }),
      }
    );

    let parsedData = await response.json();
    console.log(parsedData);
    setproducts(await parsedData);
    console.log(products);
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <>
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={productToEdit.productName}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={productToEdit.category.category}
                    name="edescription"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={productToEdit.price}
                    name="etag"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Available for Sale
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={productToEdit.isSold}
                    name="etag"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-5 my-5 px-5 ">
        <h3>My Products</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Available For Purchase</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              no++;
              return (
                <tr>
                  <th scope="row">{no}</th>
                  <td>{product.productName}</td>
                  <td>{product.category.category}</td>
                  <td>{product.price}</td>
                  <td>{new Date(product.date).toDateString()}</td>
                  <td>{product.isSold ? "No" : "Yes"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning mx-1"
                      onClick={() => showModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger btn-sm btn"
                      onClick={() => {
                        removeProduct(product.productId);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>:
      
    </>
  );
}
