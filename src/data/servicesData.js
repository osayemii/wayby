import plumbing from '../assets/plumbing/plumbing.jpg';
import electrical from '../assets/electrician/001.jpg';
import tiling from '../assets/tiling/002.jpeg';
import welding from '../assets/welding/welding.jpg';

export const initialServices = [
  {
    name: "Electrical Services",
    icon: "⚡",
    description: "Professional electrical installations, repairs, and maintenance for your home and office.",
    features: ["Wiring & Rewiring", "Lighting Installation", "Electrical Repairs", "Safety Inspections"],
    image: electrical
  },
  {
    name: "Plumbing Services",
    icon: "🔧",
    description: "Expert plumbing solutions from leak repairs to complete bathroom renovations.",
    features: ["Pipe Installation", "Leak Repairs", "Bathroom Fitting", "Emergency Services"],
    image: plumbing
  },
  {
    name: "Tiling Services",
    icon: "🏠",
    description: "Beautiful tile installations for floors, walls, and backsplashes with precision craftsmanship.",
    features: ["Floor Tiling", "Wall Tiling", "Backsplash Design", "Interlocking Tiles"],
    image: tiling
  },
  {
    name: "Upholstery Services",
    icon: "✂️",
    description: "Custom upholstery and alterations for perfect-fitting furniture and home textiles.",
    features: ["Custom Furniture", "Upholstery", "Curtain Making", "Fabric Restoration"],
    image: null
  },
  {
    name: "Welding Services",
    icon: "🔥",
    description: "Professional welding and metalwork for custom furniture frames and home fixtures.",
    features: ["Metal Fabrication", "Furniture Frames", "Gate Installation", "Repair Work"],
    image: welding
  }
];
