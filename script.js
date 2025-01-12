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
            Ton: 1000
        }
    },
    Time: {
        units: {
            Second: 1,
            Minute:  60,
            Hour:  3600,
            Day:  86400
        }
    },
    // Mechanical Units
    Force: {
        units: {
            Newton: 1,
            Kilonewton: 1/1000,
            PoundForce: 0.224809,
            OunceForce: 35.274
        }
    },
    Stress: {
        units: {
            Pascal: 1,
            KiloPascal: 1/1000,
            MegaPascal: 1/1000000,
            Bar: 1/100000,
            NPerMM2: 1/1000000,
            NPerM2: 1/1000
        }
    },
    Energy: {
        units: {
            Joule: 1,
            Kilojoule: 1/1000,
            Megajoule: 1/1000000,
            Calorie: 0.239006,
            Kilocalorie: 0.000239006
        }
    },
    Power: {
        units: {
            Watt: 1,
            Kilowatt: 1/1000,
            Megawatt: 1/1000000,
            Horsepower: 0.00134102
        }
    },
    Acceleration: {
        units: {
            MeterPerSecondSquared: 1,
            CentimeterPerSecondSquared: 100,
            KilometerPerHourSquared: 1/12960,
            GForce: 1/9.81
        }
    },
    // Thermal Units
    Temperature: {
        units: {
            Celsius: 1,
            Kelvin: 1,
            Fahrenheit: (9/5), // Conversion factor to Celsius
            Rankine: (9/5) // Conversion factor to Kelvin
        }
    },
    // Flow Units
    VolumeFlowRate: {
        units: {
            CubicMeterPerSecond: 1,
            CubicCentimeterPerSecond: 1000000,
            LiterPerSecond: 1/1000,
            GallonsPerMinute: 0.264172/60
        }
    },
    Density: {
        units: {
            KilogramPerCubicMeter: 1,
            GramPerCubicCentimeter: 1000,
            PoundPerCubicFoot: 0.06243
        }
    },
    Speed: {
        units: {
            MeterPerSecond: 1,
            KilometerPerHour: 3.6,
            MilePerHour: 2.23694,
            Knot: 1.94384
        }
    },
    // Electrical Units
    Power: {
        units: {
            Watt: 1,
            Kilowatt: 1/1000,
            Megawatt: 1/1000000,
            Horsepower: 0.00134102
        }
    },
    Energy: {
        units: {
            Joule: 1,
            Kilojoule: 1/1000,
            Megajoule: 1/1000000,
            KilowattHour: 1/3600000,
            WattHour: 1/3600
        }
    },
    // Electrothermal Units
    ElectrothermalTemperature: {
        units: {
            Celsius: 1,
            Kelvin: 1,
            Fahrenheit: (9/5),
            Rankine: (9/5)
        }
    },
    ElectrothermalPower: {
        units: {
            Watt: 1,
            Kilowatt: 1/1000,
            Megawatt: 1/1000000,
            Horsepower: 0.00134102
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
        valueTo.value = result;
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
        //console.log("Result before formatting:", result); // Debugging
        valueFrom.value = result;
    } else {
        valueFrom.value = "";
    }
}
// Toggle the visibility of the subcategory and rotate the arrow for any category
function toggleCategory(categoryId) {
    const category = document.getElementById(categoryId);
    const arrow = category.previousElementSibling.querySelector(".arrow");

    // Toggle subcategory visibility
    if (category.style.display === "none" || category.style.display === "") {
        category.style.display = "block";
        arrow.style.transform = "rotate(180deg)";  // Rotate the arrow to indicate open
    } else {
        category.style.display = "none";
        arrow.style.transform = "rotate(0deg)";  // Rotate the arrow to indicate closed
    }
}



// Initialize with the "Length" category
loadCategory("Length");
