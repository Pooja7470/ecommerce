import React from 'react'
import Layout from './../../components/Layout/Layout';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios';
import  '../../styles/AuthStyle.css'
import { useAuth } from '../../context/auth';


const Login = () => {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();
    
    
   
    const navigate = useNavigate();
    const location = useLocation();
 


    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          const res = await axios.post('http://localhost:8080/api/v1/auth/login',{
          
           email,
           password,
        });
          
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
           
            navigate(location.state || "/");
          }else{
            toast.error(res.data.message);
          }
        } catch(error){
          console.log(error)
          toast.error('Something went wrong')
    
        }
      };
  return (
    <Layout title={"Login | Flipcart app"}>
    <div className="form-container">
    
    <h4 className="title text-white ">LOGIN FORM</h4>
    
        <form onSubmit={handleSubmit} >
        <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
         <div className="mb-3">
         <button type="button"
          className="btn btn-primary" 
          onClick={() => {
            navigate("/forgot-password");
          }}
          >
          Forget Password
          
          </button>
         

         </div>
          <button type="submit" className="btn btn-primary" 
          onSubmit={handleSubmit}>
           LOGIN
          </button>
        </form>
      </div>
      
      </Layout>
  )
}

export default Login