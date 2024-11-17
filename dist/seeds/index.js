import db from '../config/connection.js';
//import { getRandomName, getRandomAssignments } from './data.js';
try {
    await db();
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
