import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const [newProduct, setNewProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    if (!newProduct) return;
    await axios.post('/products', { name: newProduct });
    setNewProduct('');
    setProducts([...products, { name: newProduct }]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name}
            {user && <button onClick={() => handleDelete(product._id)}>Delete</button>}
          </li>
        ))}
      </ul>
      {user && (
        <div>
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="New Product"
          />
          <button onClick={handleCreate}>Create</button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
