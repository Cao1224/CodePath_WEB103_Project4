const API_URL = "http://localhost:3000/api";

const getAllCars = async () => {
    try {
        const response = await fetch(`${API_URL}/cars`);
        if (!response.ok) {
            throw new Error("Failed to fetch cars");
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cars:', error);
        return [];
    }
};

const getCarById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/cars/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch car with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching car with id ${id}:`, error);
        return null;
    }
};

const createCar = async (carData) => {
    try {
        const response = await fetch(`${API_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) {
            throw new Error("Failed to create car");
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating car:', error);
        return null;
    }
};

const updateCar = async (id, carData) => {
    try {
        const response = await fetch(`${API_URL}/cars/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update car with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error updating car with id ${id}:`, error);
        return null;
    }
};

const deleteCar = async (id) => {
    try {
        const response = await fetch(`${API_URL}/cars/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete car with id ${id}`);
        }
        return true;
    } catch (error) {
        console.error(`Error deleting car with id ${id}:`, error);
        return false;
    }
};

export { getAllCars, getCarById, createCar, updateCar, deleteCar };