import React, { useState, useMemo, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link'
import './style.css'
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/TableAndShelf/001.jpeg';
import img2 from '../assets/TableAndShelf/002.jpeg';
import img3 from '../assets/TableAndShelf/40.jpg';
import img4 from '../assets/TableAndShelf/64.jpg';
import img5 from '../assets/TableAndShelf/003.jpeg';
import img6 from '../assets/TableAndShelf/73.jpg';
import img7 from '../assets/TableAndShelf/018.jpg';
import img8 from '../assets/TableAndShelf/004.jpeg';

const initialProducts = [
    {
        id: 1,
        name: 'Modern Cube Side Table',
        definition: 'Black cube side table with silver metallic accents and glossy top panel.',
        image: img1,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 2,
        name: 'Triangular Console Table',
        definition: 'Beige triangular console table with single diagonal leg and mirror above.',
        image: img2,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 3,
        name: 'Grid Wall Shelf',
        definition: 'Wooden wall shelf with multi-size compartments in a tiled setting.',
        image: img3,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 4,
        name: 'Curved Wall Shelf',
        definition: 'Wall-mounted shelf with circular LED-lit compartments and lift-up glass doors.',
        image: img4,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 5,
        name: 'Glossy Black Dining Table',
        definition: 'Modern dining room with glossy black table, window curtains, and cabinet with mirror.',
        image: img5,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 6,
        name: 'Under-Stair Glass Cabinet',
        definition: 'Triangular glass display with lit shelves beneath marble staircase.',
        image: img6,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 7,
        name: 'Under-Stair LED Shelving',
        definition: 'Triangular cubby unit with vertical lights beneath stone staircase.',
        image: img7,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 8,
        name: 'Wood Grain Coffee Table',
        definition: 'Square coffee table with dark brown wood grain top and black metal legs.',
        image: img8,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
];


import DynamicCategory from '../components/DynamicCategory';

export default function TableAndShelf() {
    return (
        <DynamicCategory 
            categoryName="TableAndShelf" 
            initialProducts={typeof initialProducts !== 'undefined' ? initialProducts : []} 
            placeholder="Search for tableandshelf..." 
        />
    );
}
