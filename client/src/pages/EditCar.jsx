import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCarById, updateCar } from '../services/CarsAPI.jsx'
import { calculateTotalPrice, formatPrice } from '../utilities/priceCalculator.js'
import { validateCarSubmission, getDisabledOptions, AVAILABLE_OPTIONS } from '../utilities/validation.js'
import CarPreview from "../components/CarPreview.jsx";
import '../App.css'

const EditCar = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        interior: '',
        exterior: '',
        roof: '',
        wheels: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const data = await getCarById(id);
                if (data) {
                    setCarData({
                        interior: data.interior,
                        exterior: data.exterior,
                        roof: data.roof,
                        wheels: data.wheels
                    });
                }
                else {
                    setError(['Car not found']);
                }
            } catch (err) {
                console.error('Error fetching car data:', err);
                setErrors(['Failed to load car data']);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchCarData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({
            ...carData,
            [name]: value
        });
        setError([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError([]);

        const validationResult = validateCarSubmission(carData);
        if (!validationResult.isValid) {
            setError(validationResult.errors);
            setIsSubmitting(false);
            return;
        }

        try {
            await updateCar(id, carData);
            alert('Car updated successfully!');
            navigate(`/customcars/${id}`);
        } catch (err) {
            console.error('Error updating car:', err);
            setError(['Failed to update car']);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading car data...</div>;
    }

    const totalPrice = calculateTotalPrice(carData);
    const disabledOptions = {
        interior: getDisabledOptions(carData, 'interior'),
        exterior: getDisabledOptions(carData, 'exterior'),
        roof: getDisabledOptions(carData, 'roof'),
        wheels: getDisabledOptions(carData, 'wheels')
    };

    return (
        <div className='edit-car'>
            <h1>Edit Car #{id}</h1>

            {error.length > 0 && (
                <div className="error-messages">
                    {error.map((err, index) => (
                        <p key={index} className="error-text">{err}</p>
                    ))}
                </div>
            )}

            <div className="car-customization-form">
                <form onSubmit={handleSubmit} className="customization-form">

                    <div className="form-group">
                        <label htmlFor="interior">Interior:</label>
                        <select
                            name="interior"
                            id="interior"
                            value={carData.interior}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Interior</option>
                            {AVAILABLE_OPTIONS.interior.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                    disabled={disabledOptions.interior.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className='form-group'>
                        <label htmlFor="exterior">Exterior Color:</label>
                        <select
                            name="exterior"
                            id="exterior"
                            value={carData.exterior}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Color</option>
                            {AVAILABLE_OPTIONS.exterior.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                    disabled={disabledOptions.exterior.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="roof">Roof Type:</label>
                        <select
                            name="roof"
                            id="roof"
                            value={carData.roof}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Roof</option>
                            {AVAILABLE_OPTIONS.roof.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                    disabled={disabledOptions.roof.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="wheels">Wheels:</label>
                        <select
                            name="wheels"
                            id="wheels"
                            value={carData.wheels}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Wheels</option>
                            {AVAILABLE_OPTIONS.wheels.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                    disabled={disabledOptions.wheels.includes(option)}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='price-display'>
                        <h3>Total Price: {formatPrice(totalPrice)}</h3>
                    </div>

                    <div className='form-actions'>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Car'}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(`/customcars/${id}`)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className={`car-preview ${carData.interior}`}>
                    <h3>Preview</h3>
                    <div className="visual-representation">
                        <CarPreview
                            exterior={carData.exterior}
                            interior={carData.interior}
                        />
                        <p style={{ color: carData.exterior === 'white' ? '#000' : 'inherit' }}>
                            Visual updates based on your selections
                        </p>
                    </div>
                    <div className="preview-details">
                        <p><strong>Interior:</strong> {carData.interior || 'Not selected'}</p>
                        <p><strong>Exterior:</strong> {carData.exterior || 'Not selected'}</p>
                        <p><strong>Roof:</strong> {carData.roof || 'Not selected'}</p>
                        <p><strong>Wheels:</strong> {carData.wheels || 'Not selected'}</p>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default EditCar