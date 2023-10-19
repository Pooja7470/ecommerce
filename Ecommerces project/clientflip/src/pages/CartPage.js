// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8080/api/v1/product/braintree/token"
//       );
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post(
//         "http://localhost:8080/api/v1/product/braintree/payment",
//         {
//           nonce,
//           cart,
//         }
//       );
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   return (
//     <Layout>
//       <div className=" cart-page">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center p-2 mb-1 ">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello  ${auth?.token && auth?.user?.fullname}`}
//               <p className="text-center">
//                 {cart?.length
//                   ? `You Have ${cart.length} items in your cart ${
//                       auth?.token ? "" : "please login to checkout !"
//                     }`
//                   : " Your Cart Is Empty"}
//               </p>
//             </h1>
//           </div>
//         </div>
//         <div className="container">
//           <div className="row ">
//             <div className="col-md-7  p-0 m-0 ">
//               {cart?.map((p) => (
//                 <div className="row card flex-row" key={p._id}>
//                   <div className="col-md-5">
//                     <img
//                       src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.fullname}
//                       width="80%"
//                       height={"110px"}
//                     />
//                   </div>
//                   <div className="col-md-4 bg-">
//                     <p>{p.fullname}</p>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>
//                       Price :
//                       {p.price.toLocaleString("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       })}
//                     </p>
//                   </div>
//                   <div className="col-md-3 cart-remove-btn">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-5 cart-summary ">
//               <h2 className="btn btn-warning">Cart Summary</h2>
//               <p>Total | Checkout | Payment</p>
//               <hr />
//               <h4 className="text-danger ">
//                 Total : <span className="text-success">{totalPrice()} </span>
//               </h4>
//               {auth?.user?.address ? (
//                 <>
//                   <div class="mb-3">
//                     <h5 className="text-danger">
//                       {" "}
//                       Current Address: <span className="text-success">{auth?.user?.address}</span>
//                     </h5>
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div>

//                   {/* <div className="mb-3">
//                     <h4>Current Address:-</h4>
//                     <h5>{auth?.user?.address}</h5>
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div> */}
//                 </>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Plase Login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
//                 {!clientToken || !auth?.token || !cart?.length ? (
//                   ""
//                 ) : (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />

//                     <button
//                       className="btn btn-primary"
//                       onClick={handlePayment}
//                       disabled={loading || !instance || !auth?.user?.address}
//                     >
//                       {loading ? "Processing ...." : "Make Payment"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;





// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Total price calculation
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Delete item from cart
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get(
//         "http://localhost:8080/api/v1/product/braintree/token"
//       );
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   // Handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post(
//         "http://localhost:8080/api/v1/product/braintree/payment",
//         {
//           nonce,
//           cart,
//         }
//       );
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="cart-page">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center p-2 mb-1">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello  ${auth?.token && auth?.user?.fullname}`}
//               <p className="text-center">
//                 {cart?.length
//                   ? `You Have ${cart.length} items in your cart ${
//                       auth?.token ? "" : "please login to checkout !"
//                     }`
//                   : " Your Cart Is Empty"}
//               </p>
//             </h1>
//           </div>
//         </div>
//         <div className="container ">
//           <div className="row">
//             <div className="col-md-7 p-0 m-0 ">
//               {cart?.map((p) => (
//                 <div className="row card flex-row  bg-primary" key={p._id}>
//                   <div className="col-md-5">
//                     <img
//                       src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.fullname}
//                       width="80%"
//                       height={"110px"}
//                     />
//                   </div>
//                   <div className="col-md-4 bg-info">
//                     <p>{p.fullname}</p>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>
//                       Price :
//                       {p.price.toLocaleString("en-US", {
//                         style: "currency",
//                         currency: "USD",
//                       })}
//                     </p>
//                   </div>
//                   <div className="col-md-3 cart-remove-btn">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-5 cart-summary bg-warning">
//               <h2 className="btn btn-warning">Cart Summary</h2>
//               <p>Total | Checkout | Payment</p>
//               <hr />
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Total:</th>
//                     <td className="text-success">{totalPrice()}</td>
//                   </tr>
//                   <tr>
//                     <th>Current Address:</th>
//                     <td className="text-success">
//                       {auth?.user?.address || "Not set"}
//                     </td>
//                   </tr>
//                 </thead>
//               </table>
//               {auth?.user?.address ? (
//                 <div className="mb-3">
//                   <button
//                     className="btn btn-outline-warning bg-info"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning bg-info"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Please Login to Checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
//                 {!clientToken || !auth?.token || !cart?.length ? (
//                   ""
//                 ) : (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />

//                     <button
//                       className="btn btn-primary"
//                       onClick={handlePayment}
//                       disabled={loading || !instance || !auth?.user?.address}
//                     >
//                       {loading ? "Processing ...." : "Make Payment"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;















import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
 import { Row, Col, Card,Button,Container } from "react-bootstrap"

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <Layout>
      <Container className="cart-page">
        <Row>
          <Col md={12}>
            <h1 className="text-center p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.token && auth?.user?.fullname}`}
            </h1>
            <p className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart${
                    auth?.token ? "" : " Please login to checkout!"
                  }`
                : "Your Cart Is Empty"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={7}  >
            {cart?.map((p) => (
              <Card key={p._id} className="mb-3  ">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt={p.fullname}
                      className="img"
                    />
                  </Col>
                  <Col md={8} >
                    <Card.Body>
                      <Card.Title>{p.fullname}</Card.Title>
                      <Card.Text>{p.description.substring(0, 100)}</Card.Text>
                      <Card.Text>
                        <span className="text-success">Price:{" "}
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                        </span>
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
          <Col  md={5} className="bg-warning top">
          
            
              <h2 className="text-white text-center bg-info">Cart Summary</h2>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((p) => (
                    <tr key={p._id}>
                      <td>{p.fullname}</td>
                      <td>
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>Total:</td>
                    <td>
                      <strong className="text-success">{totalPrice()}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h5 className="text-danger">
                    Current Address:{" "}
                    <span className="text-success">{auth.user.address}</span>
                  </h5>
                  <Button
                    variant="outline-warning bg-success mt-3"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </Button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <Button
                      variant="outline-warning bg-success"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </Button>
                  ) : (
                    <Button
                      variant="outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to Checkout
                    </Button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <Button
                      variant="primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </Button>
                  </>
                )}
              </div>
           
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default CartPage;