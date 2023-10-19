// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useParams,  useNavigate  } from "react-router-dom";
// import axios from "axios";
// import "../styles/ProductDetailsStyles.css";
// // import { Row, Col, ListGroup,Button, Image, ListGroupItem } from "react-bootstrap"


// const ProductDetails = ({match}) => {
//   const params = useParams();
//   const navigate = useNavigate();
//   // const [product, setProduct] = useState({});
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   //initale details
//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);


// //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:8080/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id)

//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//      try{
//       const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
//       setRelatedProducts(data?.product);
//     }catch(error){
//       console.log(error)
//      };
//   };

//   return (
//     <Layout>
    
    
//       <div className="row container product-details ">
//         <div className="col-md-6">
//           <img
//             src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
//             className="card-img-top "
//             height="350"
//             width={"300px"}
 
//             />
             
//         </div>
       
//         <div className="col-md-5 product-details-info ">
//         <h1 className="text-center bg-warning">Product Details</h1>
        
//               {/* <table className="table">
//                 <thead>
//                   <tr>
//                     <th scope="col">Name:-</th>
//                     <th scope="col">Description:-</th>
//                   </tr>
//                 </thead>
//                 <tbody>
                  
//                     <>
//                       <tr>
//                         <td>
//                         <th scope="col">Name:-</th>
//                         </td>
//                         <td>
//                         <h6>{product.fullname}</h6>
//                        </td>
                       
                       
//                       </tr>
//                     </>
               
//                 </tbody>
//               </table> */}
             
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>description</th>
//             <th>Price</th>
//             <th>Category</th>
           
         
//           </tr>
//         </thead>
//         <tbody>
          
//             <tr>
//               <td>{product.fullname}</td>
//               <td>{product.description}</td>
//               <td>{product?.price?.toLocaleString("en-US", {
//               style: "currency",
//               currency: "USD",
              
//             })}
            
           
//             </td>
//             <td>
//             {product?.category?.fullname}
//             </td>
//             </tr>
       
//         </tbody>
//       </table>
//             </div>
           




//         {/* <div className="col-md-6 product-details-info bg-light">
//         <h1 className="text-center bg-warning">Product Deatails</h1>
//         <hr/>
//         <h6 className="to">Name : <span className="tol">{product.fullname}</span></h6>
//         <h6 className="to" >Description : <span className="tol">{product?.description}</span></h6>
//         <h6 className="to">
//             Price :<span className="tol">
//             {product?.price?.toLocaleString("en-US", {
//               style: "currency",
//               currency: "USD",
              
//             })}
//             </span>
//           </h6>
//         <h6 className="to">Category : <span className="tol">{product?.category?.fullname}</span></h6>
//         <button class="btn btn-secondary ms-2">ADD TO CART</button>
                                                                                                                                                              
//         </div> */}
      
//       <hr/>
//       <div className="row container similar-products">
//         <h4>Similar Products</h4> 
//         {relatedProducts.length < 1 && (
//           <p className="text-center">No Similar Products found</p>
//           )}
//         <div className="d-flex flex-wrap">
//             {relatedProducts?.map((p) => (
//               <div className="card m-2" key={p._id}>
//                 <img
//                   src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.fullname}
//                 />
                
//                 <div className="card-body">
//                 <div className="card-name-price">
//                   <h5 className="card-title">{p.fullname}</h5>
//                   <h5 className="card-title card-price">
//                     {p.price.toLocaleString("en-US", {
//                       style: "currency",
//                       currency: "USD",
//                     })}
//                   </h5>
//                   </div>
//                   <p className="card-text">
//                     {p.description.substring(0, 60)}...
//                   </p>
//                   <div className="card-name-price">
//                   <button
//                     className="btn btn-info ms-1"
//                     onClick={() => navigate(`/product/${p.slug}`)}
//                   >
//                     More Details
//                   </button>
                 
//                 </div>
//               </div>
//               </div>
//             ))}
//           </div>
//           </div>
//           </div>
          
      
       
//     </Layout>
//   );
// };


import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetailsStyles.css";
import { Button, Table, Row, Col, Image } from "react-bootstrap";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  // Function to handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <Layout>
      <Row className="container product-details ">
        <Col md={5} className="left">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.fullname}
           width={"300px"}
         
          />
        </Col>

        <Col md={6} className="product-details-info">
          <h1 className="text-center bg-warning">Product Details</h1>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Product Name:</td>
                <td>{product.fullname}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{product.description}</td>
              </tr>
              <tr>
                <td>Price:</td>
                <td>
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
              <tr>
                <td>Category:</td>
                <td>{product?.category?.fullname}</td>
              </tr>
              <tr>
                <td>Sizes:</td>
               
      <div className=" hr">
      <div>
        <label>
          <input
            type="radio"
            name="size"
            value="L"
            checked={selectedSize === "L"}
            onChange={() => handleSizeSelect("L")}
          />
            <span>L</span>
        </label>
      </div><br/>
      <div>
        <label>
          <input
            type="radio"
            name="size"
            value="XL"
            checked={selectedSize === "XL"}
            onChange={() => handleSizeSelect("XL")}
          />
            <span>XL</span>
        </label>
      </div><br/>
      <div>
        <label>
          <input
            type="radio"
            name="size"
            value="XXL"
            checked={selectedSize === "XXL"}
            onChange={() => handleSizeSelect("XXL")}
          />
           <span>XXL</span>
        </label>
      </div><br/>
      <div>
        <label>
          <input
            type="radio"
            name="size"
            value="XXXL"
            checked={selectedSize === "XXXL"}
            onChange={() => handleSizeSelect("XXXL")}
          />
          <span>XXXL</span>
        </label>
      </div><br/>
      <div>
        <p>Selected Size: {selectedSize}</p>
      </div>
    </div>
                       
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <hr />

      <div className="row container similar-products">
        <h4>Similar Products</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <Row>

          {relatedProducts?.map((p) => (
            <Col md={4} key={p._id}>
              <div className="card">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  alt={p.fullname}
                  
                />
                <div className="card-body ml-6 ">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.fullname}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <Button
                      variant="info"
                      className="ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
           
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default ProductDetails;