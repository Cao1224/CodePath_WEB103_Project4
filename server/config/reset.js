import './dotenv.js'
import { pool } from './database.js';

const createcustom_itemssTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS custom_items (
                id SERIAL PRIMARY KEY,
                interior VARCHAR(50) NOT NULL,
                exterior VARCHAR(50) NOT NULL,
                roof VARCHAR(50) NOT NULL,
                wheels VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await pool.query(query);
        console.log('Custom items table created successfully.');
    } catch (error) {
        console.error('Error creating custom items table:', error);
    }
};

const seedcustom_itemssTable = async () => {
    try {
        const sampleCars = [
            { interior: 'Leather', exterior: 'Red', roof: 'Sunroof', wheels: 'Alloy' },
            { interior: 'Fabric', exterior: 'Blue', roof: 'Standard', wheels: 'Steel' },
            { interior: 'Leather', exterior: 'Black', roof: 'Panoramic', wheels: 'Alloy' },
            { interior: 'Fabric', exterior: 'White', roof: 'Standard', wheels: 'Steel' },
            { interior: 'Leather', exterior: 'Silver', roof: 'Sunroof', wheels: 'Alloy' },
            { interior: 'Fabric', exterior: 'Green', roof: 'Standard', wheels: 'Sports' },
            { interior: 'Leather', exterior: 'Yellow', roof: 'Panoramic', wheels: 'Alloy' },
        ];

        const insertQuery = `
            INSERT INTO custom_items (interior, exterior, roof, wheels)
            VALUES ($1, $2, $3, $4)
        `;

        for (const car of sampleCars) {
            await pool.query(insertQuery, [car.interior, car.exterior, car.roof, car.wheels]);
        }

        console.log('Sample data inserted into custom items table successfully.');
    }
    catch (error) {
        console.error('Error inserting sample data into custom items table:', error);
    }
};

const resetDatabase = async () => {
    try {
        await createcustom_itemssTable();
        await seedcustom_itemssTable();
        console.log('Database reset and seeded successfully.');
    } catch (error) {
        console.error('Error resetting the database:', error);
    } finally {
        pool.end();
    }
};

resetDatabase();