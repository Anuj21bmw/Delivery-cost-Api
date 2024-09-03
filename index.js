const express = require('express');
const app = express();
app.use(express.json());

const centers = {
    C1: {
        A: 3,  // 3kg
        B: 2,  // 2kg
        C: 8,  // 8kg
    },
    C2: {
        D: 12, // 12kg
        E: 25, // 25kg
        F: 15, // 15kg
    },
    C3: {
        G: 0.5, // 0.5kg
        H: 1,   // 1kg
        I: 2,   // 2kg
    }
};

// Assuming these are the distances between locations
const distances = {
    C1: 10,  // Distance from C1 to L1
    C2: 20,  // Distance from C2 to L1
    C3: 15,  // Distance from C3 to L1
};

const costPerKm = 5; // Cost per km to deliver

app.post('/calculate-delivery-cost', (req, res) => {
    const order = req.body;
    let minCost = Infinity;

    // Check all centers to find the minimum delivery cost
    for (const center in centers) {
        let totalWeight = 0;
        let totalCost = 0;

        // Calculate total weight and cost from this center
        for (const product in order) {
            if (centers[center][product]) {
                totalWeight += centers[center][product] * order[product];
            }
        }

        // Calculate cost if delivering from this center
        if (totalWeight > 0) {
            totalCost = totalWeight * distances[center] * costPerKm;
            if (totalCost < minCost) {
                minCost = totalCost;
            }
        }
    }

    res.json({ cost: minCost });
});

app.listen(3000, () => {
    console.log('API is running on http://localhost:3000');
});




