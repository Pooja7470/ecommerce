// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import UserMenu from '../../components/Layout/UserMenu'
// import { useAuth } from '../../context/auth'

// const Dashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout title={"Dashboard - Flipkart App"}>
//        <div className="container-flui m-3 p-3 dashboard ">
//     <div className="row">
//     <div className="col-md-3">
//        <UserMenu/> 
//     </div>
//     <div className="col-md-9">
//         <div className="card w-75 p-3 bg-light ">
//         <h3 className=''>Name: {auth?.user?.fullname}</h3>
//         <h3 className=''> Email: {auth?.user?.email}</h3>
//         <h3 className=''>Address: {auth?.user?.address}</h3>

//         </div>
//     </div>

//     </div>

//     </div>
//     </Layout>
//   )
// }

// export default Dashboard

import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Flipkart App"}>
      <div className="container-flui m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 bg-light bg-black text-white">
              <h3 className='text-center'>User Information</h3>
              <table className="table text-white">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{auth?.user?.fullname}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{auth?.user?.email}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td>{auth?.user?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard;
