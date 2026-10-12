export const PRICE_LIST = {
    interior: {
        Fabric: 0,
        Leather: 1500,
        Premium: 3000
    },
    exterior: {
        White: 0,
        Black: 500,
        Red: 1000,
        Blue: 750,
        Silver: 600,
        Green: 800,
        Yellow: 900
    },
    roof: {
        Standard: 0,
        Sunroof: 1200,
        Panoramic: 2000
    },
    wheels: {
        Steel: 0,
        Alloy: 800,
        Sports: 1500,
        Premium: 2500
    }
};

export const BASE_PRICE = 20000;

export const calculateTotalPrice = (options) => {
    let totalPrice = BASE_PRICE;

    if (options.interior && PRICE_LIST.interior[options.interior] !== undefined) {
        totalPrice += PRICE_LIST.interior[options.interior];
    }

    if (options.exterior && PRICE_LIST.exterior[options.exterior] !== undefined) {
        totalPrice += PRICE_LIST.exterior[options.exterior];
    }  

    if (options.roof && PRICE_LIST.roof[options.roof] !== undefined) {
        totalPrice += PRICE_LIST.roof[options.roof];
    }

    if (options.wheels && PRICE_LIST.wheels[options.wheels] !== undefined) {
        totalPrice += PRICE_LIST.wheels[options.wheels];
    }

    return totalPrice;
};

export const getOptionPrice = (category, option) => {
    if (PRICE_LIST[category] && PRICE_LIST[category][option] !== undefined) {
        return PRICE_LIST[category][option];
    }
    return 0;
};

export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
};