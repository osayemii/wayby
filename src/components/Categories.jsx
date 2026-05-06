import React from 'react';
import './Categories.css';
import { HashLink } from 'react-router-hash-link';
import bedroomImage from '../assets/8.jpg';
import livingRoomImage from '../assets/Livingroom/livingroom.jpg';
import doorImage from '../assets/70.jpg';
import tvstandImage from '../assets/Tvstand/008.jpg';

const categories = [
  {
    id: 1,
    name: "Living Room",
    image: livingRoomImage,
    description: "Comfortable seating and elegant tables for your living space",
    linkCat: "/categories/Wardrobe#searchAndSort"
  },
  {
    id: 2,
    name: "Dining Room",
    image: null,
    comingSoon: true,
    description: "Beautiful dining sets for memorable family meals",
    linkCat: "/categories/KitchenAndDinning#searchAndSort"
  },
  {
    id: 3,
    name: "Bedroom",
    image: bedroomImage,
    description: "Luxurious beds and storage solutions for restful nights",
    linkCat: "/categories/BedRoom#searchAndSort"
  },
  {
    id: 4,
    name: "Office",
    image: null,
    comingSoon: true,
    description: "Productive workspaces with classic style and functionality",
    linkCat: "/categories/Office#searchAndSort"
  },
  {
    id: 5,
    name: "Door",
    image: doorImage,
    description: "Elegant entrances with timeless craftsmanship",
    linkCat: "/categories/Door#searchAndSort"
  },
  {
    id: 6,
    name: "TV Stand",
    image: tvstandImage,
    description: "Sleek storage and modern style for your entertainment space",
    linkCat: "/categories/TVstands#searchAndSort"
  },
];

const Categories = () => {
  return (
    <section id="categories" className="section bg-light">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h2>Shop by Category</h2>
          <p>Explore our extensive collection organized by room and function to find exactly what you need.</p>
        </div>
        
        <div className="categories-grid grid grid-3">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                {category.comingSoon ? (
                  <div className="coming-soon-placeholder">
                    <span className="coming-soon-text">Coming Soon</span>
                  </div>
                ) : (
                  <img src={category.image} alt={category.name} />
                )}
                <div className="category-overlay">
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <HashLink to={category.linkCat}><button className="btn btn-primary">Shop Now</button></HashLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;