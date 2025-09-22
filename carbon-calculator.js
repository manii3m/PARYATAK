document.addEventListener('DOMContentLoaded', function() {
    // Carbon Calculator functionality
    const carbonButtons = document.querySelectorAll('#carbon-calculator-btn');
    
    carbonButtons.forEach(button => {
        button.addEventListener('click', function() {
            showCarbonCalculator();
        });
    });

    function showCarbonCalculator() {
        // Create carbon calculator modal
        const modal = document.createElement('div');
        modal.className = 'carbon-modal';
        modal.innerHTML = `
            <div class="carbon-modal-content">
                <div class="carbon-modal-header">
                    <h2 class="carbon-modal-title">🌱 Carbon Emission Calculator</h2>
                    <button class="carbon-close-btn">&times;</button>
                </div>
                <div class="carbon-modal-body">
                    <form class="carbon-form" id="carbon-form">
                        <div class="carbon-form-row">
                            <div class="carbon-form-group">
                                <label for="distance">Distance (km)</label>
                                <input type="number" id="distance" name="distance" placeholder="Enter distance in kilometers" required min="0" step="0.1">
                            </div>
                            <div class="carbon-form-group">
                                <label for="mileage">Vehicle Mileage (km/liter)</label>
                                <input type="number" id="mileage" name="mileage" placeholder="Enter mileage" required min="0" step="0.1">
                            </div>
                        </div>
                        
                        <div class="carbon-form-group">
                            <label for="fuel-type">Type of Fuel</label>
                            <select id="fuel-type" name="fuel-type" required>
                                <option value="">Select Fuel Type</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="cng">CNG</option>
                                <option value="lpg">LPG</option>
                                <option value="electric">Electric</option>
                            </select>
                        </div>
                        
                        <div class="carbon-form-row">
                            <div class="carbon-form-group">
                                <label for="passengers">Number of Passengers</label>
                                <input type="number" id="passengers" name="passengers" placeholder="Number of passengers" min="1" value="1" required>
                            </div>
                            <div class="carbon-form-group">
                                <label for="vehicle-type">Vehicle Type</label>
                                <select id="vehicle-type" name="vehicle-type" required>
                                    <option value="">Select Vehicle Type</option>
                                    <option value="car">Car</option>
                                    <option value="suv">SUV</option>
                                    <option value="motorcycle">Motorcycle</option>
                                    <option value="bus">Bus</option>
                                    <option value="truck">Truck</option>
                                </select>
                            </div>
                        </div>
                        
                        <button type="submit" class="carbon-calculate-btn">Calculate Carbon Footprint</button>
                    </form>
                    
                    <div class="carbon-results" id="carbon-results">
                        <h3>Your Carbon Footprint</h3>
                        <div class="carbon-result-item">
                            <span class="carbon-result-label">Distance Traveled:</span>
                            <span class="carbon-result-value" id="result-distance">-</span>
                        </div>
                        <div class="carbon-result-item">
                            <span class="carbon-result-label">Fuel Consumed:</span>
                            <span class="carbon-result-value" id="result-fuel">-</span>
                        </div>
                        <div class="carbon-result-item">
                            <span class="carbon-result-label">CO2 Emissions:</span>
                            <span class="carbon-result-value" id="result-co2">-</span>
                        </div>
                        <div class="carbon-result-item">
                            <span class="carbon-result-label">Per Passenger:</span>
                            <span class="carbon-result-value" id="result-per-passenger">-</span>
                        </div>
                        <div class="carbon-result-item">
                            <span class="carbon-result-label">Total Carbon Footprint:</span>
                            <span class="carbon-result-value" id="result-total">-</span>
                        </div>
                    </div>
                    
                    <div class="carbon-tips" id="carbon-tips" style="display: none;">
                        <h4>🌿 Eco-Friendly Tips</h4>
                        <ul>
                            <li>Consider carpooling to reduce per-person emissions</li>
                            <li>Use public transportation when possible</li>
                            <li>Plan efficient routes to minimize distance</li>
                            <li>Maintain your vehicle for optimal fuel efficiency</li>
                            <li>Consider electric or hybrid vehicles</li>
                        </ul>
                    </div>
                    
                    <div class="emission-factors">
                        <h4>📊 Emission Factors Used</h4>
                        <p>Petrol: 2.31 kg CO2/liter | Diesel: 2.68 kg CO2/liter | CNG: 1.88 kg CO2/kg | LPG: 1.51 kg CO2/liter | Electric: 0.05 kg CO2/kWh</p>
                    </div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.appendChild(modal);

        // Emission factors (kg CO2 per unit)
        const emissionFactors = {
            petrol: 2.31,    // kg CO2 per liter
            diesel: 2.68,    // kg CO2 per liter
            cng: 1.88,       // kg CO2 per kg
            lpg: 1.51,       // kg CO2 per liter
            electric: 0.05   // kg CO2 per kWh
        };

        // Vehicle efficiency multipliers
        const vehicleEfficiency = {
            car: 1.0,
            suv: 1.2,
            motorcycle: 0.6,
            bus: 2.5,
            truck: 3.0
        };

        // Form submission
        const form = modal.querySelector('#carbon-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCarbonFootprint();
        });

        function calculateCarbonFootprint() {
            // Get form values
            const distance = parseFloat(document.getElementById('distance').value);
            const mileage = parseFloat(document.getElementById('mileage').value);
            const fuelType = document.getElementById('fuel-type').value;
            const passengers = parseInt(document.getElementById('passengers').value);
            const vehicleType = document.getElementById('vehicle-type').value;

            // Validation
            if (!distance || !mileage || !fuelType || !passengers || !vehicleType) {
                alert('Please fill in all fields');
                return;
            }

            // Calculate fuel consumed
            const fuelConsumed = distance / mileage; // liters or kg

            // Get emission factor
            const emissionFactor = emissionFactors[fuelType];
            if (!emissionFactor) {
                alert('Invalid fuel type selected');
                return;
            }

            // Get vehicle efficiency multiplier
            const efficiencyMultiplier = vehicleEfficiency[vehicleType] || 1.0;

            // Calculate CO2 emissions
            let co2Emissions;
            if (fuelType === 'electric') {
                // For electric vehicles, assume 0.2 kWh per km
                const energyConsumed = distance * 0.2; // kWh
                co2Emissions = energyConsumed * emissionFactor * efficiencyMultiplier;
            } else {
                co2Emissions = fuelConsumed * emissionFactor * efficiencyMultiplier;
            }

            // Calculate per passenger emissions
            const perPassengerEmissions = co2Emissions / passengers;

            // Display results
            displayResults(distance, fuelConsumed, co2Emissions, perPassengerEmissions, fuelType, vehicleType);
        }

        function displayResults(distance, fuelConsumed, co2Emissions, perPassengerEmissions, fuelType, vehicleType) {
            const resultsDiv = document.getElementById('carbon-results');
            const tipsDiv = document.getElementById('carbon-tips');

            // Update result values
            document.getElementById('result-distance').textContent = `${distance.toFixed(1)} km`;
            document.getElementById('result-fuel').textContent = `${fuelConsumed.toFixed(2)} ${fuelType === 'cng' ? 'kg' : 'liters'}`;
            document.getElementById('result-co2').textContent = `${co2Emissions.toFixed(2)} kg CO2`;
            document.getElementById('result-per-passenger').textContent = `${perPassengerEmissions.toFixed(2)} kg CO2`;
            document.getElementById('result-total').textContent = `${co2Emissions.toFixed(2)} kg CO2`;

            // Show results
            resultsDiv.classList.add('show');
            tipsDiv.style.display = 'block';

            // Add environmental impact assessment
            addEnvironmentalImpact(co2Emissions);
        }

        function addEnvironmentalImpact(co2Emissions) {
            const resultsDiv = document.getElementById('carbon-results');
            
            // Remove existing impact assessment
            const existingImpact = resultsDiv.querySelector('.environmental-impact');
            if (existingImpact) {
                existingImpact.remove();
            }

            // Create impact assessment
            const impactDiv = document.createElement('div');
            impactDiv.className = 'environmental-impact';
            impactDiv.style.cssText = `
                margin-top: 15px;
                padding: 15px;
                background: rgba(46, 70, 0, 0.1);
                border-radius: 10px;
                border-left: 4px solid #2e4600;
            `;

            let impactText = '';
            let impactColor = '#2e4600';

            if (co2Emissions < 1) {
                impactText = '🟢 Very Low Impact - Great choice for the environment!';
                impactColor = '#006400';
            } else if (co2Emissions < 5) {
                impactText = '🟡 Low Impact - Consider eco-friendly alternatives';
                impactColor = '#d4a017';
            } else if (co2Emissions < 15) {
                impactText = '🟠 Moderate Impact - Try to reduce your carbon footprint';
                impactColor = '#ff8c00';
            } else {
                impactText = '🔴 High Impact - Consider alternative transportation methods';
                impactColor = '#dc3545';
            }

            impactDiv.innerHTML = `
                <h4 style="color: ${impactColor}; margin: 0 0 10px 0; font-size: 1em;">Environmental Impact</h4>
                <p style="margin: 0; color: ${impactColor}; font-weight: 600;">${impactText}</p>
            `;

            resultsDiv.appendChild(impactDiv);
        }

        // Close modal functionality
        const closeBtn = modal.querySelector('.carbon-close-btn');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });

        // Auto-focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);
    }

    // Add some default values for better UX
    function setDefaultValues() {
        const distanceInput = document.getElementById('distance');
        const mileageInput = document.getElementById('mileage');
        
        if (distanceInput && !distanceInput.value) {
            distanceInput.value = '50'; // Default 50km
        }
        if (mileageInput && !mileageInput.value) {
            mileageInput.value = '15'; // Default 15 km/liter
        }
    }
});
