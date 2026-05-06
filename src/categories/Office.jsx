import React, { useState, useMemo, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link'
import './style.css'
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/Office/17.jpg';
import img2 from '../assets/Office/27.jpg';
import img3 from '../assets/Office/28.jpg';
import img4 from '../assets/Office/2nd.jpg';
import { useNavigate } from 'react-router-dom';

const initialProducts = [
    {
        id: 1,
        name: 'Office READ Bookshelf',
        definition: 'Wall-mounted shelf shaped as “READ” with built-in book compartments for office.',
        image: img1,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 2,
        name: 'LED Panel Reception Desk',
        definition: 'White desk with lit wood panels, ceiling fixture, and wall shelf unit.',
        image: img2,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 3,
        name: 'Wood Panel Reception Desk',
        definition: 'Light wood desk with white sides, black chairs, and mosaic tile backdrop.',
        image: img3,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 4,
        name: 'L-Shaped Marble Reception Counter',
        definition: 'Modern L-shaped counter with marble veining, wood-grain finish, and illuminated display cabinet.',
        image: img4,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
];


import DynamicCategory from '../components/DynamicCategory';

export default function Office() {
    return (
        <DynamicCategory 
            categoryName="Office" 
            initialProducts={typeof initialProducts !== 'undefined' ? initialProducts : []} 
            placeholder="Search for office..." 
        />
    );
}
