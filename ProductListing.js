import React, { useEffect, useState } from "react";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        let url =
          category === "all"
            ? "https://fakestoreapi.com/products"
            : `https://fakestoreapi.com/products/category/${category}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center"> Product Catalog</h2>

      {/* Category Selector */}
      <div className="mb-4 d-flex justify-content-center">
        <select
          className="form-select w-auto"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women’s Clothing</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger text-center">
          {error}{" "}
          <button
            className="btn btn-sm btn-outline-light ms-2"
            onClick={() => setCategory(category)}
          >
            Retry
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="row g-4">
        {!loading &&
          !error &&
          products.map((product) => (
            <div className="col-md-3 col-sm-6" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{product.title}</h6>
                  <p className="fw-bold text-success mb-2">
                    {product.price}
                  </p>
                  <button className="btn btn-primary mt-auto">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductListing;
