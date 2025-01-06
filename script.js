// Conversion Data: A map of conversion factors
const conversionData = {
    length: {
        meters: {
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
        },
        kilometers: {
            meters: 1000,
            centimeters: 100000,
            millimeters: 1000000,
        },
        centimeters: {
            meters: 0.01,
            kilometers: 0.00001,
            millimeters: 10,
        },
        millimeters: {
            meters: 0.001,
            kilometers: 0.000001,
            centimeters: 0.1,
        },
    },
    mass: {
        grams: {
            kilograms: 0.001,
            milligrams: 1000,
            pounds: 0.00220462,
        },
        kilograms: {
            grams: 1000,
            milligrams: 1000000,
            pounds: 2.20462,
        },
        milligrams: {
            grams: 0.001,
            kilograms: 0.000001,
            pounds: 0.00000220462,
        },
        pounds: {
            grams: 453.592,
            kilograms: 0.453592,
            milligrams: 453592,
        },
    },
    time: {
        seconds: {
            minutes: 1 / 60,
            hours: 1 / 3600,
            days: 1 / 86400,
        },
        minutes: {
            seconds: 60,
            hours: 1 / 60,
            days: 1 / 1440,
        },
        hours: {
            seconds: 3600,
            minutes: 60,
            days: 1 / 24,
        },
        days: {
            seconds: 86400,
            minutes: 1440,
            hours: 24,
        },
    },
};

// Initialize with length category
window.onload = () => changeCategory('length');

let currentCategory = 'length';

function changeCategory(category) {
    currentCategory = category;
    loadUnits();

    // Remove active class from all buttons
    document.getElementById('lengthBtn').classList.remove('active');
    document.getElementById('timeBtn').classList.remove('active');
    document.getElementById('massBtn').classList.remove('active');

    // Add active class to the selected category button
    if (category === 'length') {
        document.getElementById('lengthBtn').classList.add('active');
    } else if (category === 'time') {
        document.getElementById('timeBtn').classList.add('active');
    } else if (category === 'mass') {
        document.getElementById('massBtn').classList.add('active');
    }
}

function loadUnits() {
    let unitFrom = document.getElementById('unitFrom');
    let unitTo = document.getElementById('unitTo');
    unitFrom.innerHTML = '';
    unitTo.innerHTML = '';
    
    let units = Object.keys(conversionData[currentCategory]);
    
    units.forEach(unit => {
        let optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
        unitFrom.appendChild(optionFrom);
        
        let optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
        unitTo.appendChild(optionTo);
    });
}

function convertUnits() {
    let value = parseFloat(document.getElementById('valueInput').value);
    let unitFrom = document.getElementById('unitFrom').value;
    let unitTo = document.getElementById('unitTo').value;

    let result = 0;

    // Look up the conversion factor for the selected category, from, and to units
    if (conversionData[currentCategory][unitFrom] && conversionData[currentCategory][unitFrom][unitTo]) {
        result = value * conversionData[currentCategory][unitFrom][unitTo];
    } else {
        result = value; // If no conversion factor found, return the original value
    }

    document.getElementById('result').textContent = result;
}
