import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.scss';

const Home = () => {
  const [products, setProduct] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(`http://localhost:9000/products/?name=${search}`);
      setProduct(response.data);
    };
    getProducts();
  }, [search]);
  

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/products/${id}`);
      const response = await axios.get(`http://localhost:9000/products`);
      setProduct(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  
  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" 
        placeholder="Masukan kata kunci..."
        onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.filter((val) => {
            if (search === '') {
              return val
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val
            }
            return false;
          }).map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td className="text-right">{product.price}</td>
              <td className="text-center">
                <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                <Link to="#" className="btn btn-sm btn-danger" onClick={() => deleteProduct(product._id)}>Delete</Link>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;