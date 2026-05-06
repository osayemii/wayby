import React, { useState, useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import './style.css'
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/Kitchen/001.jpeg';
import img2 from '../assets/Kitchen/8.jpg';
import img5 from '../assets/Kitchen/21.jpg';
import img7 from '../assets/Kitchen/42.jpg';
import img8 from '../assets/Kitchen/53.jpg';
import img9 from '../assets/Kitchen/55.jpg';
import img10 from '../assets/Kitchen/57.jpg';
import img11 from '../assets/Kitchen/58.jpg';
import img12 from '../assets/Kitchen/61.jpg';
import img13 from '../assets/Kitchen/009.jpg';
import img14 from '../assets/Kitchen/011.jpeg';

const initialProducts = [
    {
        id: 1,
        name: 'Modern Dining Space',
        definition: 'Elegant dining room with oval wooden table, geometric wall panels, and frosted glass partition.',
        image: img1,
        soldOut: false,
        price: 249.5,
        date: new Date('2026-01-03'),
    },
    {
        id: 2,
        name: 'Marble Luxe Kitchen',
        definition: 'Glossy black island with pendant lights, set against bold marbled flooring and lit glass cabinetry.',
        image: img2,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 5,
        name: 'Modern Wet Kitchen',
        definition: 'Functional L-shaped kitchen with marble countertops and wood-textured cabinets.',
        image: img5,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 7,
        name: 'Glossy Wet Kitchen',
        definition: 'Modern kitchen with white cabinets, wood island, and built-in appliances.',
        image: img7,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 8,
        name: 'Compact Wet Kitchen',
        definition: 'Stylish corner kitchen with wood cabinets, LED shelves, and built-in cooktop.',
        image: img8,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 9,
        name: 'Light Wood Wet Kitchen',
        definition: 'Simple kitchen with wood cabinets, marble counters, and built-in appliances.',
        image: img9,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 10,
        name: 'Dual-Tone Wet Kitchen',
        definition: 'Modern kitchen with white and wood cabinets, built-in fridge, and oven.',
        image: img10,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 11,
        name: 'Marble Glow Wet Kitchen',
        definition: 'Elegant kitchen with wood and white cabinets, marble backsplash, and LED lighting.',
        image: img11,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 12,
        name: 'Gloss Grey Wet Kitchen',
        definition: 'Sleek kitchen with glossy cabinets, glass shelves, and warm lighting.',
        image: img12,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 13,
        name: 'Grid Pantry Shelving',
        definition: 'White wall-mounted shelves in a walk-in pantry with bold marble flooring.',
        image: img13,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 14,
        name: 'Minimalist Modern Kitchenette',
        definition: 'Compact kitchenette with dark ribbed paneling, handle-less taupe cabinets, and polished tile flooring.',
        image: img14,
        soldOut: false,
        price: 249.5,
        date: new Date('2026-01-01'),
    },
];

import DynamicCategory from '../components/DynamicCategory';

export default function KitchenAndDinning() {
    return (
        <DynamicCategory 
            categoryName="KitchenAndDinning" 
            initialProducts={initialProducts} 
            placeholder="Search for kitchen and dinning..." 
        />
    );
}