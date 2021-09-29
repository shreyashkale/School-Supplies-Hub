import React, { useState } from "react";

export default function ProductRegister(props) {
  const [details, setDetails] = useState({
    name: "",
    category: "",
    discription: "",
    city: "",
    tags: "",
    price: "",
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    console.log(details);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8085//product-api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: details.name,
        productCategorydto: { category: details.category },
        discription: details.description,
        city: details.city,
        tags: details.tags,
        price: details.price,
        userDTO: JSON.parse(localStorage.getItem("user")),
      }),
    });
    const json = await response.json();
    if (response.ok) {
      props.showAlert("Product Registered successfully", "success");
    } else {
      props.showAlert("Some Error Occured", "danger");
    }
  };
  return (
    <div className="container my-2">
      <br />
      <h1 className="text-center" style={{ color: "dimgrey" }}>
        Register Your Product
      </h1>
      <br />
      <div className="col-lg-8 m-auto d-block ">
        <form className="bg-light px-4 py-2" onSubmit={handleSubmit}>
          
          <div className="formgroup">
            <span>Product Name:</span>
            <input
              type="text"
              name="name"
              className="form-control"
              id="uname"
              value={details.name}
              onChange={handleChange}
              placeholder="Enter product Name"
              autoComplete="off"
              required
            />
            <span id="username" className="text-danger font-weight-bold"></span>
            <br />
          </div>
          <div className=" formgroup">
            <span>Select Product Category:</span>
            <select
              className="custom-select"
              style={{ width: "300px" }}
              name="category"
              onChange={handleChange}
              value={details.category}
            >
              <option value="Book">Book</option>
              <option value="Notebook">Notebook</option>
              <option value="Drawing Elements">Drawing Elements</option>
              <option value="Coloring Elements">Coloring Elements</option>
              <option value="Other Accessories">Other Accessories</option>
            </select>
          </div>
          <br />

          <div className="formgroup">
            <span>Description:</span>
            <textarea
              className="form-control"
              placeholder="Enter key points of product(like brand,color etc.).."
              id="floatingTextarea2"
              value={details.description}
              name="description"
              onChange={handleChange}
              style={{ height: "100px" }}
              required
            ></textarea>
            <span id="textarea" className="text-danger font-weight-bold"></span>
          </div>
          <br />
          <div className="formgroup">
            <span>City:</span>
            <input
              type="text"
              name="city"
              className="form-control"
              id="city"
              value={details.city}
              onChange={handleChange}
              placeholder="Enter Your City"
              required
              autocomplete="off"
            />
            <br />
            <span id="loc" className="text-danger font-weight-bold"></span>
          </div>
          <div className="formgroup">
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              className="form-control"
              id="tags"
              value={details.tags}
              onChange={handleChange}
              placeholder="Enter Tags"
              required
              autocomplete="off"
            />
            <br />
            <span id="loc" className="text-danger font-weight-bold"></span>
          </div>
          <div className="formgroup">
            <span>Set a Price:</span>
            <input
              type="number"
              name="repassword"
              className="form-control"
              id="price"
              name="price"
              value={details.price}
              onChange={handleChange}
              placeholder="Enter Expected price"
              required
              autocomplete="off"
            />
            <br />
            <span id="price" className="text-danger font-weight-bold"></span>
          </div>
          <div className="photo">
            <div className="photpdiv">
            <div className="e22Bu">
                <span>Add photo</span>
              </div>
              <form>
                <div class="form-group">
                  {/* <label for="exampleFormControlFile1">
                    Upload Image
                  </label> */}
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                  />
                </div>
              </form>{" "}
              
            </div>
          </div>
          <br />

          <br />
          <br />
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Post Product"
            />
          </div>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}
