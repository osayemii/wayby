import React, { useState, useMemo, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link'
import './style.css'
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/Tvstand/13.jpg';
import img2 from '../assets/Tvstand/39.jpg';
import img3 from '../assets/Tvstand/54.jpg';
import img4 from '../assets/Tvstand/71.jpg';
import img5 from '../assets/Tvstand/72.jpg';
import img6 from '../assets/Tvstand/3.jpg';
import img7 from '../assets/Tvstand/5.jpg';
import img8 from '../assets/Tvstand/9.jpg';
import img9 from '../assets/Tvstand/001.jpg';
import img10 from '../assets/Tvstand/003.jpg';
import img11 from '../assets/Tvstand/002.jpg';
import img12 from '../assets/Tvstand/008.jpg';
import img13 from '../assets/Tvstand/005.jpg';
import { useNavigate } from 'react-router-dom';

const initialProducts = [
    {
        id: 1,
        name: 'Symmetric Display Unit',
        definition: 'TV wall with lit shelves, black speakers, and marble flooring.',
        image: img1,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 2,
        name: 'Slat Shelf Console',
        definition: 'Wood slat TV panel with twin lit shelves and beige floating drawers.',
        image: img2,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 3,
        name: 'Grooved Panel Media Wall',
        definition: 'LED-lit grooved panel with glass cabinet and floating drawers.',
        image: img3,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 4,
        name: 'Marble Accent Media Wall',
        definition: 'Grey marble panel with lit wood shelves and floating base cabinet.',
        image: img4,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    // {
    //     id: 5,
    //     name: 'Slat Panel Console',
    //     definition: 'TV wall with vertical slats, white console, and LED strip lighting.',
    //     image: img5,
    //     soldOut: false,
    //     price: 39.0,
    //     date: new Date('2025-08-10'),
    // },
    {
        id: 6,
        name: 'Glass Shelf TV Unit',
        definition: 'Wall-mounted panel with lit glass shelves and low storage cabinet.',
        image: img6,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 7,
        name: 'Slatted TV Console',
        definition: 'Vertical wood slats with LED strips, white drawers, and marble flooring.',
        image: img7,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 8,
        name: 'Olive Media Wall',
        definition: 'TV panel with LED-lit wood frame, drawers, and chandelier above.',
        image: img8,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 9,
        name: 'Grooved LED Media Wall',
        definition: 'Beige and brown panel with vertical grooves, LED border, and floating drawers.',
        image: img9,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 10,
        name: 'Backlit Panel Entertainment Unit',
        definition: 'Warm-lit TV panel with two drawers, open shelf, and tall black side element.',
        image: img10,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 11,
        name: 'Wood Panel TV Console',
        definition: 'TV wall with rectangular LED frame, three-drawer cabinet, and open shelf.',
        image: img11,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 12,
        name: 'Grey Frame Entertainment Unit',
        definition: 'Recessed TV with yellow accent light, grey cabinetry, and open shelves.',
        image: img12,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 13,
        name: 'Matte Panel TV Console',
        definition: 'Brown TV wall with vertical LED strip and black Urdu-inscribed side panel.',
        image: img13,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
];


import DynamicCategory from '../components/DynamicCategory';

export default function TVstands() {
    return (
        <DynamicCategory 
            categoryName="TVstands" 
            initialProducts={typeof initialProducts !== 'undefined' ? initialProducts : []} 
            placeholder="Search for tvstands..." 
        />
    );
}
