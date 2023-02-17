import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.scss';

const Detail = () => {
  const [product, setProduct] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    getProductById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`https://good-teal-haddock-veil.cyclic.app/products/${id}`);
    setProduct(response.data);
  }
  
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>
    <div>
    <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: {product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Detail;