import React, { useState, useMemo, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link'
import './style.css'
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/Livingroom/001.jpeg';
import img2 from '../assets/Livingroom/002.jpeg';
import img3 from '../assets/Livingroom/003.jpeg';
import img4 from '../assets/Livingroom/63.jpg';
import img5 from '../assets/Livingroom/005.jpeg';
import img6 from '../assets/Livingroom/006.jpeg';
import img7 from '../assets/Livingroom/007.jpeg';
import img8 from '../assets/Livingroom/008.jpeg';
import img9 from '../assets/Livingroom/009.jpeg';
import img10 from '../assets/Livingroom/010.jpeg';

const initialProducts = [
    {
        id: 1,
        name: 'Luxurious Living Room Suite',
        definition: 'Opulent living room with cream L-shaped sectional, black marble coffee tables, and elegant gold accents.',
        image: img1,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 2,
        name: 'Modern Grey Sofa Set',
        definition: 'Contemporary light grey three-seater and two-seater sofas with modern blocky design.',
        image: img2,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 3,
        name: 'Tufted Grey Armchair',
        definition: 'Elegant grey armchair with deep button tufting, diamond-patterned backrest, and curved armrests.',
        image: img3,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 4,
        name: 'Grey Sectional Sofa',
        definition: 'L-shaped dark grey sofa with yellow pillows and brown patterned curtains.',
        image: img4,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 5,
        name: 'Ornate Gold Three-Seater Sofa',
        definition: 'Luxurious three-seater with intricately carved gold frame, cream damask upholstery, and tufted backrest.',
        image: img5,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 6,
        name: 'Ornate Gold Two-Seater Sofa',
        definition: 'Elegant two-seater with Baroque-style gold frame, cream damask pattern, and golden braided trim.',
        image: img6,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 7,
        name: 'Ornate Gold Armchair Pair',
        definition: 'Matching pair of opulent armchairs with decorative gold frames and cream damask patterned upholstery.',
        image: img7,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 8,
        name: 'Modern Beige Sectional Set',
        definition: 'Contemporary L-shaped sectional with matching chaise lounge in light beige, featuring striped accent pillows.',
        image: img8,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 9,
        name: 'Boucle Armchair and Ottoman',
        definition: 'Modern cream armchair and matching ottoman set with textured boucle fabric and tufted backrest.',
        image: img9,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 10,
        name: 'Dark Blue Tufted Armchairs',
        definition: 'Pair of elegant dark blue armchairs with high tufted backrests, rolled arms, and matching throw pillows.',
        image: img10,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
];


import DynamicCategory from '../components/DynamicCategory';

export default function LivingRoom() {
    return (
        <DynamicCategory 
            categoryName="LivingRoom" 
            initialProducts={typeof initialProducts !== 'undefined' ? initialProducts : []} 
            placeholder="Search for livingroom..." 
        />
    );
}
