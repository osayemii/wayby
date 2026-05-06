import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import SkeletonLoader from './SkeletonLoader';
import './FeaturedProducts.css';

function FeaturedProducts() {  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(
          collection(db, 'products'), 
          orderBy('updatedAt', 'desc'), 
          limit(6)
        );
        const data = await getDocs(q);
        setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section id="products" className="section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2>Featured Collection</h2>
          <p>Discover our most popular pieces, carefully selected for their exceptional quality and timeless appeal.</p>
        </div>
        
        {loading ? (
          <SkeletonLoader count={4} />
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-overlay">
                    <HashLink to={`/categories/${product.category}#searchAndSort`}>
                      <button className="btn btn-primary">View Details</button>
                    </HashLink>
                  </div>
                </div>
                <div className="product-info">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <h3 style={{margin: 0}}>{product.name}</h3>
                    {product.category === 'Videos' && <span style={{fontSize: '0.7rem', background: '#e67e22', color: 'white', padding: '2px 8px', borderRadius: '4px'}}>Video</span>}
                  </div>
                  <p className="product-description">{product.definition}</p>
                  <div className="product-footer">
                    {/* Price removed as per request */}
                  </div>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-center" style={{gridColumn: '1/-1'}}>No products found. Start adding some in the admin panel!</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;