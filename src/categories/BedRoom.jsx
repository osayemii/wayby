import './style.css';

import { initialBedroomProducts } from '../data/bedroomData';
import DynamicCategory from '../components/DynamicCategory';

function BedRoom() {
    return (
        <DynamicCategory 
            categoryName="BedRoom" 
            initialProducts={initialBedroomProducts} 
            placeholder="Search for bedroom..." 
        />
    );
}

export default BedRoom;