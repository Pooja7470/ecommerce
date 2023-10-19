// import React from "react";
// import Layout from "./../../components/Layout/Layout";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import { useAuth } from "../../context/auth";

// const AdminDashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout>
//       <div className="container-fluid  p-3 dashboard ">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3> Admin Name : {auth?.user?.fullname}</h3>
//               <h3> Admin Email : {auth?.user?.email}</h3>
//               <h3> Admin Contact : {auth?.user?.contact}</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 cul">
            <div className="card w-75 p-3 mt-5 pul">
              <table>
                <tbody>
                  <tr>
                    <td><strong>Admin Name:</strong></td>
                    <td>{auth?.user?.fullname}</td>
                  </tr>
                  <tr>
                    <td><strong>Admin Email:</strong></td>
                    <td>{auth?.user?.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Admin Contact:</strong></td>
                    <td>{auth?.user?.contact}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;

