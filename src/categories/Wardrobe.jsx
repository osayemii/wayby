import React, { useState, useMemo, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link'
import './style.css';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/Cupboard/14.jpg'
import img4 from '../assets/Cupboard/38.jpg'
import img5 from '../assets/Cupboard/41.jpg'
import img8 from '../assets/Cupboard/52.jpg'
import img9 from '../assets/Cupboard/59.jpg'
import img10 from '../assets/Cupboard/48.jpg'
import img11 from '../assets/Cupboard/019.jpg'
import img12 from '../assets/Cupboard/008.jpg'
import img13 from '../assets/Cupboard/013.jpg'
import img14 from '../assets/Cupboard/007.jpg'
import img100 from '../assets/Cupboard/017.jpg'
import sadImage from '../assets/sad.jpeg'

const initialProducts = [
    {
        id: 1,
        name: 'Built-In Wardrobe Unit',
        definition: 'Spacious wooden wardrobe with open shelves and tall storage compartments.',
        image: img1,
        soldOut: false,
        date: new Date('2025-08-15'),
    },
    {
        id: 4,
        name: 'White Panel Wardrobe',
        definition: 'Modern built-in wardrobe with sleek black handles and clean white finish.',
        image: img4,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 5,
        name: 'Beige Entry Wardrobe',
        definition: 'Built-in unit with tall cabinets, open shelves, and cushioned bench with hooks.',
        image: img5,
        soldOut: false,
        date: new Date('2025-08-15'),
    },
    {
        id: 8,
        name: 'Corner Wardrobe Setup',
        definition: 'Light wood wardrobe with mirror, drawers, and open shelves in a cozy bedroom corner.',
        image: img8,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 9,
        name: 'Dual-Tone Wardrobe',
        definition: 'White and taupe cabinet with drawers, shelves, and sleek black handles.',
        image: img9,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 10,
        name: 'Glass-Front Closet Display',
        definition: 'Dark wardrobe with lit glass cabinets, sleek drawers, and marble flooring.',
        image: img10,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 11,
        name: 'Gold Handle Wardrobe Set',
        definition: 'Tall brown wardrobe with gold handles and matching desk with mirror.',
        image: img11,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 12,
        name: 'Tan & Black Vanity Wardrobe',
        definition: 'Matte tan wardrobe with glossy black panels and central vanity mirror.',
        image: img12,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 13,
        name: 'Taupe Dressing Combo',
        definition: 'Neutral-tone wardrobe with drawers and dressing table under mirror.',
        image: img13,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
    {
        id: 14,
        name: ' Beige & Black Glass Wardrobe',
        definition: 'Matte beige wardrobe with glossy black center doors and dark handles.',
        image: img14,
        soldOut: false,
        date: new Date('2025-08-10'),
    },
];


import DynamicCategory from '../components/DynamicCategory';

export default function Wardrobe() {
    return (
        <DynamicCategory 
            categoryName="Wardrobe" 
            initialProducts={typeof initialProducts !== 'undefined' ? initialProducts : []} 
            placeholder="Search for wardrobe..." 
        />
    );
}
