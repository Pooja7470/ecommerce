import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import Categoryform from "../../components/Form/Categoryform";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [fullname, setFullname] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdateName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { fullname }
      );
      if (data?.success) {
        toast.success(`${fullname} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something want wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async(e) => {
    e.preventDefault()
    try{
      const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}` , {fullname:updatedName});
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    }catch(error){
      toast.error( 'something went wrong')
    }
  };

  //delete category
  const handleDelete = async(pId) => {
    
    try{
      const { data } = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}` , {fullname:updatedName});
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    }catch(error){
      toast.error( 'something went wrong')
    }
  };
  return (
    <Layout title={"Dashboard - Create-Category"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className="lef">Manage category</h1>
            <div className="p-3 w-50">
              <Categoryform
                handleSubmit={handleSubmit}
                value={fullname}
                setValue={setFullname}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Fullname</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.fullname}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2 "
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(c.fullname);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2 " onClick={() => {handleDelete(c._id)}}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
              
            >
              <Categoryform
                value={updatedName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
