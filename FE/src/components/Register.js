import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";

export default function Register(props) {
  const [credentials, setcredentials] = useState({
    userName: "",
    email: "",
    mobileno: null,
    password: "",
  });
  
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8085/user-api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: credentials.userName,
        mobileno: credentials.mobileno,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    // console.log("UserName++++++++++++++" + credentials.userName);
    // console.log("Email++++++++++++++" + credentials.email);
    // console.log("Password++++++++++++++" + credentials.password);



    if (response.ok) {
      props.showAlert("Registered Successfully!! Please Login", "success");
      history.push("/login");
    } else {
      props.showAlert(json.erMessage, "danger");
    }
  };
  const handleChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div class="container mb-5">
      <br />
      <br />
      <div class="col-lg-8 m-auto d-block">
        <form onSubmit={handleSubmit} class="bg-light register-form">
          <div class="formgroup">
            <label>
              <b>Username</b>
            </label>
            <input
              type="text"
              name="userName"
              class="form-control"
              id="username"
              placeholder="Enter Username"
              autoComplete="off"
              required
              onChange={handleChange}
            />
            <span id="username" class="text-danger font-weight-bold"></span>
            <br />
          </div>
          <div class="formgroup">
            <label>
              <b> Email:</b>
            </label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              placeholder=" e.g.name@example.coms"
              required
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <span id="vemail" class="text-danger font-weight-bold"></span>
          </div>
          <div class="formgroup">
            <label>
              <b> Mobile No:</b>
            </label>
            <input
              type="number"
              name="mobileno"
              class="form-control"
              id="mobileno"
              placeholder="Enter 10-digit mobile no."
              required
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <span id="vmb" class="text-danger font-weight-bold"></span>
          </div>
          {/* <div class="formgroup">
            <label>
              <b>City:</b>
            </label>
            <input
              type="text"
              name="city"
              class="form-control"
              id="city"
              placeholder="Enter current city"
              required
              autoComplete="off"
            />
            <br />
            <span id="vcity" class="text-danger font-weight-bold"></span>
          </div> */}
          <div class="formgroup">
            <label>
              <b>Password:</b>
            </label>
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
              placeholder="Create Password"
              required
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <span id="vpass" class="text-danger font-weight-bold"></span>
          </div>
          {/* <div class="formgroup">
            <label>
              <b>Confirm Password:</b>
            </label>
            <input
              type="password"
              name="repassword"
              class="form-control"
              id="repass"
              placeholder="RE-enter Password"
              required
              autoComplete="off"
            />
            <br />
            <span id="vrepass" class="text-danger font-weight-bold"></span>
          </div> */}
          <br />
          <div class="form-group">
            <input type="submit" class="btn btn-primary mx-3 " value="SUBMIT" />
            <input type="reset" class="btn btn-primary mx-3" value="RESET" />
          </div>
        </form>
      </div>
    </div>
  );
}
