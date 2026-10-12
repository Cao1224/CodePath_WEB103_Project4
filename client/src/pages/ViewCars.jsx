import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI.jsx'
import { calculateTotalPrice, formatPrice } from '../utilities/priceCalculator.js'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const data = await getAllCars();
                setCars(data);
            }
            catch (err) {
                console.error('Error fetching cars:', err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                await deleteCar(id);
                setCars(cars.filter(car => car.id !== id));
            } catch (err) {
                console.error('Error deleting car:', err);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div className="view-cars-container">
            <h2>Custom Car Collection</h2>
            {cars.length === 0 ? (
                <div>
                    <p>No cars available.</p>
                    <Link to="/">Create your first car</Link>
                </div>
            ) : (
                <div className="car-grid">
                    {cars.map((car) => (
                        <div key={car.id} className="car-card">
                            <h3>Car ID: {car.id}</h3>
                            <div className="car-details">
                                <p><strong>Interior:</strong> {car.interior}</p>
                                <p><strong>Exterior:</strong> {car.exterior}</p>
                                <p><strong>Roof:</strong> {car.roof}</p>
                                <p><strong>Wheels:</strong> {car.wheels}</p>
                                <p className="price"><strong>Total Price:</strong> {formatPrice(calculateTotalPrice(car))}</p>
                            </div>
                            <div className="car-actions">
                                <Link to={`/customcars/${car.id}`} className="btn btn-view">
                                    View Details
                                </Link>
                                <Link to={`/edit/${car.id}`} className="btn btn-edit">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(car.id)}
                                    className="btn btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}

export default ViewCars