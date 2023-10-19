import React from 'react'
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchPut = () => {
    const [values,setValues] = useSearch();
    const navigate = useNavigate();
     
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${values.keyword}`)
            setValues({ ...values, results: data});
            navigate("/searchh")



        }catch(error){
            console.log(error)
        }
    }
  return (
    <div>
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
  <input className="form-control me-2" 
  type="search"
   placeholder="Search" 
   aria-label="Search"
   value={values.keyword} 
    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
   />
  <button className="btn btn-primary" type="submit">Search</button>
</form>

      </div>
  )
}

export default SearchPut