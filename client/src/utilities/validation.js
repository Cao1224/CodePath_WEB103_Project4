export const INCOMPATIBLE_COMBINATION = [
    {
        condition: { interior: 'Fabric', wheels: 'Premium' },
        message: 'Please select a different interior option when choosing Premium wheels.'
    },
    {
        condition: { roof: 'Panoramic', interior: 'Fabric' },
        message: 'Please select a different interior option when choosing a Panoramic roof.'
    },
    {
        condition: { wheels: 'Sports', roof: 'Sunroof' },
        message: 'Please select a different roof option when choosing Sports wheels.'
    }
];

export const AVAILABLE_OPTIONS = {
    interior: ['Fabric', 'Leather', 'Premium'],
    exterior: ['White', 'Black', 'Red', 'Blue', 'Silver', 'Green', 'Yellow'],
    roof: ['Standard', 'Sunroof', 'Panoramic'],
    wheels: ['Steel', 'Alloy', 'Sports', 'Premium']
};

export const validateFeatureCombinations = (selectedOptions) => {
    const errors = [];

    INCOMPATIBLE_COMBINATION.forEach((combination) => {
        const { condition, message } = combination;
        let isIncompatible = true;

        for (const key in condition) {
            if (selectedOptions[key] !== condition[key]) {
                isIncompatible = false;
                break;
            }
        }

        if (isIncompatible) {
            errors.push(message);
        }
    });

    return errors;
};

export const validateRequiredFields = (carData) => {
    const requiredFields = ['interior', 'exterior', 'roof', 'wheels'];
    const missingFields = [];

    requiredFields.forEach((field) => {
        if (!carData[field] || carData[field].trim() === '') {
            missingFields.push(field);
        }
    });

    return {
        isValid: missingFields.length === 0,
        missingFields,
        message:
            missingFields.length > 0
                ? `Please fill in the following required fields: ${missingFields.join(', ')}`
                : ''
    };
};

export const getDisabledOptions = (selectedOptions, category) => {
    const disabledOptions = [];

    AVAILABLE_OPTIONS[category].forEach((option) => {
        const tempSelection = {
            ...selectedOptions,
            [category]: option
        };

        const errors = validateFeatureCombinations(tempSelection);

        if (errors.length > 0) {
            disabledOptions.push(option);
        }
    });

    return disabledOptions;
};

export const validateCarSubmission = (carData) => {
    const requiredFieldsValidation = validateRequiredFields(carData);

    if (!requiredFieldsValidation.isValid) {
        return {
            isValid: false,
            errors: [requiredFieldsValidation.message]
        };
    }

    const combinationErrors = validateFeatureCombinations(carData);

    return {
        isValid: combinationErrors.length === 0,
        errors: combinationErrors
    };
};