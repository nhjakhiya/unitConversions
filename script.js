// Conversion factors for different categories
const conversionData = {
    Length: {
        units: {
            Meter: 1,
            Kilometer: 1/0.001,
            Centimeter: 1/100,
            Millimeter: 1/1000,
            Inch: 1/39.3701,
            Foot: 1/3.28084,
            Yard: 1/1.09361,
            Mile: 1/0.000621371
        }
    },
    Mass: {
        units: {
            Kilogram: 1,
            Gram: 1000,
            Milligram: 1000000,
            Pound: 2.20462,
            Ounce: 35.274,
            Ton: 0.001
        }
    },
    Time: {
        units: {
            Second: 1,
            Minute: 1 / 60,
            Hour: 1 / 3600,
            Day: 1 / 86400
        }
    },
    Volume: {
        units: {
            Liter: 1,
            Milliliter: 1000,
            CubicMeter: 0.001,
            Gallon: 0.264172,
            Pint: 2.11338
        }
    }
};

// Function to load the selected category and populate dropdowns
function loadCategory(category) {
    const unitFrom = document.getElementById("unitFrom");
    const unitTo = document.getElementById("unitTo");

    // Highlight the selected button
    const buttons = document.querySelectorAll(".sidebar-btn");
    buttons.forEach(button => {
        if (button.textContent === category) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    // Clear previous options
    unitFrom.innerHTML = "";
    unitTo.innerHTML = "";

    // Populate dropdowns with units from the selected category
    const units = conversionData[category]?.units || {};
    for (const unit in units) {
        const optionFrom = document.createElement("option");
        optionFrom.value = units[unit];
        optionFrom.textContent = unit;
        unitFrom.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = units[unit];
        optionTo.textContent = unit;
        unitTo.appendChild(optionTo);
    }

    // Set default conversion
    unitFrom.selectedIndex = 0;
    unitTo.selectedIndex = 1;
    updateConversion();
}

// Function to perform the conversion when "From" value changes
function updateFromValue() {
    const unitFrom = document.getElementById("unitFrom");
    const unitTo = document.getElementById("unitTo");
    const valueFrom = document.getElementById("valueFrom").value;
    const valueTo = document.getElementById("valueTo");

    // Get the conversion factors
    const factorFrom = parseFloat(unitFrom.value);
    const factorTo = parseFloat(unitTo.value);

    // Calculate the converted value
    if (!isNaN(valueFrom)) {
        const result = (valueFrom * factorFrom) / factorTo;
        valueTo.value = result.toFixed(4);
    } else {
        valueTo.value = "";
    }
}

// Function to perform the conversion when "To" value changes
function updateToValue() {
    const unitFrom = document.getElementById("unitFrom");
    const unitTo = document.getElementById("unitTo");
    const valueFrom = document.getElementById("valueFrom");
    const valueTo = document.getElementById("valueTo").value;

    // Get the conversion factors
    const factorFrom = parseFloat(unitFrom.value);
    const factorTo = parseFloat(unitTo.value);

    // Calculate the converted value
    if (!isNaN(valueTo)) {
        const result = (valueTo * factorTo) / factorFrom;
        valueFrom.value = result.toFixed(4);
    } else {
        valueFrom.value = "";
    }
}

// Initialize with the "Length" category
loadCategory("Length");
