import React, { useState, useMemo, useEffect } from 'react';
import './style.css'
import sadImage from '../assets/sad.jpeg';
import SearchAndSort from '../components/SearchAndSort';
import img1 from '../assets/Door/001.jpeg';
import img2 from '../assets/Door/5.jpg';
import img3 from '../assets/Door/15.jpg';
import img4 from '../assets/Door/16.jpg';
import img5 from '../assets/Door/19.jpg';
import img6 from '../assets/Door/20.jpg';
import img7 from '../assets/Door/22.jpg';
import img10 from '../assets/Door/32.jpg';
import img11 from '../assets/Door/34.jpg';
import img12 from '../assets/Door/35.jpg';
import img13 from '../assets/Door/36.jpg';
import img14 from '../assets/Door/37.jpg';
import img16 from '../assets/Door/66.jpg';
import img17 from '../assets/Door/70.jpg';
import img19 from '../assets/Door/003.jpg';
import img20 from '../assets/Door/012.jpg';
import img21 from '../assets/Door/002.jpeg';

const initialProducts = [
    {
        id: 1,
        name: 'Decorative White Entrance Door',
        definition: 'Modern building entrance featuring grey textured walls and elegant white laser-cut decorative panels with intricate floral and scrollwork patterns.',
        image: img1,
        soldOut: false,
        price: 249.5,
        date: new Date('2026-01-03'),
    },
    {
        id: 2,
        name: 'Classic White Double Door',
        definition: 'White paneled double door with embossed frame and metallic handles.',
        image: img2,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 3,
        name: 'Striped Wood Door',
        definition: 'Light wood door with vertical metal strip and black handle.',
        image: img3,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 4,
        name: 'Light Panel Door',
        definition: 'Light wood door with rectangular panel and black handle.',
        image: img4,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 5,
        name: 'Rich Wood Door',
        definition: 'Dark wood door with metal handle and tiled floor base.',
        image: img5,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 6,
        name: 'Dark Grain Door',
        definition: 'Vertical grain wood door with black handle and matching frame.',
        image: img6,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 7,
        name: 'Horizontal Grain Door',
        definition: 'Wood door with horizontal grain and sleek metal handle.',
        image: img7,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 10,
        name: 'Open Grain Door',
        definition: 'Horizontal wood grain door with black handle and matching frame.',
        image: img10,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 11,
        name: 'Corner Grain Door',
        definition: 'Dark horizontal grain door with black handle and exposed hinges.',
        image: img11,
        soldOut: false,
        price: 249.5,
        date: new Date('2025-08-20'),
    },
    {
        id: 12,
        name: 'White Frosted Glass Door',
        definition: 'White door with three vertical frosted panels and gold handle.',
        image: img12,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 13,
        name: 'Sliding Panel Door',
        definition: 'White-framed sliding glass doors with wood side panels.',
        image: img13,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 14,
        name: 'Geometric Double Door',
        definition: 'Brown double door with angular wood grain and central metal strip.',
        image: img14,
        soldOut: false,
        price: 129.99,
        date: new Date('2025-08-15'),
    },
    {
        id: 16,
        name: 'Matte Grey Door',
        definition: 'Grey door with digital lock, set in matching wall paneling.',
        image: img16,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 17,
        name: 'Gold-Trim Wood Door',
        definition: 'Brown wood door with gold inlays and dark handle.',
        image: img17,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    // {
    //     id: 18,
    //     name: 'Frosted Glass Double Doors',
    //     definition: 'Dark wood doors with vertical frosted panels and sleek metal handles for a modern touch.',
    //     image: img18,
    //     soldOut: false,
    //     price: 39.0,
    //     date: new Date('2025-08-10'),
    // },
    {
        id: 19,
        name: 'White Panel Door',
        definition: 'Minimal white door with black handle, set against decorative wall paneling.',
        image: img19,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 20,
        name: 'Glossy Double Door',
        definition: 'White double door with sleek finish and black handle on active panel.',
        image: img20,
        soldOut: false,
        price: 39.0,
        date: new Date('2025-08-10'),
    },
    {
        id: 21,
        name: 'Modern Glass Partition Door',
        definition: 'Contemporary glass partition system with frosted horizontal bands, light wood frame, and integrated modern design featuring wooden ceiling slats and ambient lighting.',
        image: img21,
        soldOut: false,
        price: 249.5,
        date: new Date('2026-01-03'),
    },
];


import DynamicCategory from '../components/DynamicCategory';

export default function Door() {
    return (
        <DynamicCategory 
            categoryName="Door" 
            initialProducts={typeof initialProducts !== 'undefined' ? initialProducts : []} 
            placeholder="Search for door..." 
        />
    );
}
