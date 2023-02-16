import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import { useHistory } from 'react-router-dom';
import './index.scss';

const Tambah = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [status, setStatus] = useState();
  const history = useHistory();

  const saveProduct = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9000/products', {
        name,
        price,
        stock,
        status
      });
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveProduct}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" 
          value={name} onChange={(e) => setName(e.target.value)}/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"
          value={price} onChange={(e) => setPrice(e.target.value)}/>
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock"
          value={stock} onChange={(e) => setStock(e.target.value)}/>
          <Input name="status" type="checkbox" label="Active" onChange={(e) => setStatus(e.target.value)} defaultChecked/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;