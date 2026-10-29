
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([
    "Laptop",
    "Mobile"
  ]);

  const [productName, setProductName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("Product list modified!");
  }, [products]);

  function addProduct() {
    if (productName.trim() === "") return;

    setProducts([...products, productName]);
    setProductName("");
  }

  function removeProduct(index) {
    setProducts(products.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h2>Product List</h2>

      <input
        type="text"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Enter product name"
      />

      <button onClick={addProduct}>Add Product</button>

      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product}{" "}
            <button onClick={() => removeProduct(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p>{message}</p>
    </div>
  );
}

export default App;
