import React from "react";

var order = {
  name: "",
  email: "",
  address: "",
  card: "",
};

function validate(order) {
  let val = true;
  let email = document.getElementById("inputEmail4");
  let name = document.getElementById("inputName");
  let card = document.getElementById("inputCard");
  let zip = document.getElementById("inputZip");
  let state = document.getElementById("inputState");
  let address = document.getElementById("inputAddress");
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const form = document.getElementById("checkout-form");
  const backButton = document.getElementById("back-button");
  const summaryCard = document.querySelector(".card");
  const summaryList = document.querySelector(".card > ul");

  if (
    !email.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    email.setAttribute("class", "form-control is-valid");
    order.email = email.value;
  }

  if (!zip.value.match(/^[0-9]{5}(?:-[0-9]{4})?$/)) {
    zip.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    zip.setAttribute("class", "form-control is-valid");
  }

  if (state.value === "Choose") {
    state.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    state.setAttribute("class", "form-control is-valid");
  }

  if (address.value.length === 0) {
    address.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    address.setAttribute("class", "form-control is-valid");
    order.address = address.value;
  }
  if (name.value.length === 0) {
    name.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    name.setAttribute("class", "form-control is-valid");
    order.name = name.value;
  }

  if (!card.value.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
    card.setAttribute("class", "form-control is-invalid");
    val = false;
  } else {
    card.setAttribute("class", "form-control is-valid");
    order.card = card.value;
  }

  const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div className="alert alert-${type} alert-dismissible" role="alert">`,
      ` <div>${message}</div>`,
      ' <button type="button" className="btn-close" data-bs-dismiss="alert" arialabel="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
  };

  if (val) {
    form.classList.add("collapse");
    backButton.classList.add("collapse");

    for (var [key, value] of Object.entries(order)) {
      if (key === "card") {
        value = "****-****-****" + value.slice(-5);
      }
      summaryList.innerHTML +=
        '<li className="list-group-item"> <b>' +
        `${key}` +
        ": </b>" +
        `${value}` +
        "</li>";
    }
    summaryCard.classList.remove("collapse");
    alertPlaceholder.innerHTML = "";
    alert(
      '<i className="bi-cart-check-fill"></i> You have made an order!',
      "success"
    );
  }
  return val;
}

export function Cart({ isActive, changePage, cart, productPrices, resetCart }) {


  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function inputCardValidator(event) {
    const inputCard = document.querySelector("#inputCard");

    if (!inputCard.value) {
      return event.preventDefault(); 
    } else {
      inputCard.value = inputCard.value.replace(/-/g, "");
      let newVal = "";
      for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
        if (nums !== 0 && nums % 4 === 0) {
          newVal += "-";
        }
        newVal += inputCard.value[i];
        if (isNumeric(inputCard.value[i])) {
          nums++;
        }
      }
      inputCard.value = newVal;
    }
  }
  function backShopping() {
    changePage("Browse");
  }
  return !isActive ? (
    <></>
  ) : (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
        crossOrigin="anonymous"
      ></link>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
        crossOrigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"
      ></link>

      <div className="container">
        <div className="row ">
          <div className="col-3">
            <button
              onClick={() => backShopping()}
              id="back-button"
              className="my-4 bg-green-200 hover:bg-green-300 py-2 px-2 border-green-700 rounded"
            >
              Back
            </button>
            <div className="border-white border-2 p-4 bg-white rounded">
              <h1>Cart</h1>
              <div className="text-left">
                {Object.keys(cart).map((key) =>
                  cart[key] > 0 ? (
                    <div key={key}>
                      {key}: {cart[key]} x ${productPrices[key].toFixed(2)}
                    </div>
                  ) : null
                )}
              </div>
              <br></br>
              <div>
                Subtotal: $
                {Object.keys(cart)
                  .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                  .reduce(
                    (total, price, index) =>
                      total + price * cart[Object.keys(cart)[index]],
                    0
                  )
                  .toFixed(2)}
              </div>
              <br></br>
              <div>
                Tax: $
                {Object.keys(cart)
                  .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                  .reduce(
                    (total, price, index) =>
                      total + 0.06 * price * cart[Object.keys(cart)[index]],
                    0
                  )
                  .toFixed(2)}
              </div>
              <br></br>
              <div>
                Total: $
                {Object.keys(cart)
                  .map((key) => (cart[key] > 0 ? productPrices[key] : 0))
                  .reduce(
                    (total, price, index) =>
                      total +
                      price * cart[Object.keys(cart)[index]] +
                      0.06 * price * cart[Object.keys(cart)[index]],
                    0
                  )
                  .toFixed(2)}
              </div>
            </div>
          </div>

          <div className="col-8">
            <div className="text-white" id="liveAlertPlaceholder"></div>

            <form className="row g-3 text-black" id="checkout-form">
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">
                  Full Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                ></input>
                <div className="valid-feedback">Great!</div>
                <div className="invalid-feedback">Invalid/Required (Ex.John Doe)</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email*
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                ></input>
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                Invalid/Required (Ex.johndoe@iastate.edu)
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="inputCard" className="form-label">
                  Card*
                </label>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi-credit-card-fill"></i>
                  </span>
                  <input
                    type="text"
                    id="inputCard"
                    className="form-control"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={() => {
                      inputCardValidator();
                    }}
                  ></input>
                  <div className="valid-feedback">Great!</div>
                  <div className="invalid-feedback">
                  Invalid/Required (Ex.1234-5678-9012-3456)
                  </div>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">
                  Address*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                ></input>
              </div>
              <div className="col-12">
                <label htmlFor="inputAddress2" className="form-label">
                  Address 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress2"
                  placeholder="Apartment/Suite/Unit"
                ></input>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                  City*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                ></input>
              </div>
              <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">
                  State*
                </label>
                <select id="inputState" className="form-select">
                  <option>Choose</option>
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                  <option>Kentucky</option>
                  <option>Louisiana</option>
                  <option>Maine</option>
                  <option>Maryland</option>
                  <option>Massachusetts</option>
                  <option>Michigan</option>
                  <option>Minnesota</option>
                  <option>Mississippi</option>
                  <option>Missouri</option>
                  <option>Montana</option>
                  <option>Nebraska</option>
                  <option>Nevada</option>
                  <option>New Hampshire</option>
                  <option>New Jersey</option>
                  <option>New Mexico</option>
                  <option>New York</option>
                  <option>North Carolina</option>
                  <option>North Dakota</option>
                  <option>Ohio</option>
                  <option>Oklahoma</option>
                  <option>Oregon</option>
                  <option>Pennsylvania</option>
                  <option>Rhode Island</option>
                  <option>South Carolina</option>
                  <option>South Dakota</option>
                  <option>Tennessee</option>
                  <option>Texas</option>
                  <option>Utah</option>
                  <option>Vermont</option>
                  <option>Virginia</option>
                  <option>Washington</option>
                  <option>West Virginia</option>
                  <option>Wisconsin</option>
                  <option>Wyoming</option>
                </select>
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Zip*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                ></input>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-success my-4"
                  onClick={(event) => {
                    if (!validate(order)) {
                      const alertPlaceholder = document.getElementById(
                        "liveAlertPlaceholder"
                      );
                      alertPlaceholder.innerHTML = "";
                      alert("Please fill out the required fields marked *", "danger");
                      event.preventDefault();
                      event.stopPropagation();
                    }
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  {" "}
                  <i className="bi-bag-check"></i> Place Order
                </button>
              </div>
            </form>

            <div className="card collapse" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title">Order Confirmation</h5>
              </div>
              <ul className="list-group list-group-flush"></ul>
              <button
                href=""
                onClick={() => {
                  resetCart("Bread");
                  resetCart("Burrito");
                  resetCart("Cherries");
                  resetCart("Cookie");
                  resetCart("Grapes");
                  resetCart("Ice Cream");
                  resetCart("Pizza");
                  resetCart("Ramen");
                  changePage("Browse");
                }}
                className="btn btn-secondary"
              >
                {" "}
                <i className="bi-arrow-left-circle"></i>
                Return
              </button>
            </div>
          </div>

          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}
