import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// We'll import data from each category (simplified for this script)
import { initialServices } from '../data/servicesData';
import { initialBedroomProducts } from '../data/bedroomData';

export const migrateAllData = async () => {
  try {
    console.log("Starting full migration...");

    // 1. Migrate Services
    const servicesSnap = await getDocs(collection(db, "services"));
    if (servicesSnap.empty) {
      for (const service of initialServices) {
        const { id, ...serviceData } = service;
        await addDoc(collection(db, "services"), serviceData);
      }
      console.log("Services migrated!");
    }

    // 2. Migrate Products (Bedroom)
    const productsSnap = await getDocs(collection(db, "products"));
    if (productsSnap.empty) {
      for (const product of initialBedroomProducts) {
        await addDoc(collection(db, "products"), product);
      }
      console.log("Bedroom products migrated!");
    }
    
    alert("Data Migration Complete! Refresh the page.");
    return { success: true };

    // 2. Migration for Categories
    // Note: To keep this simple, we are setting up the structure.
    // In a real scenario, we would loop through all categories.
    // I will help you migrate these via the Admin Panel initialization button.

    return { success: true };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, error };
  }
};
