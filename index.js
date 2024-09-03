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




// const express = require('express');
// const app = express();
// app.use(express.json());

// const centers = {
//     C1: { A: 1, B: 1, C: 1 },
//     C2: { D: 1, E: 1, F: 1 },
//     C3: { G: 1, H: 1, I: 1 }
// };

// const distances = {
//     C1: { L1: 30, C2: 25, C3: 35 },
//     C2: { L1: 40, C1: 25, C3: 55 },
//     C3: { L1: 50, C1: 35, C2: 55 }
// };

// const costPerKm = 4;
// const weightPerItem = 0.5; // kg

// function calculateWeight(order) {
//     return Object.values(order).reduce((sum, quantity) => sum + quantity, 0) * weightPerItem;
// }

// function calculateRouteCost(route) {
//     let totalDistance = 0;
//     for (let i = 0; i < route.length - 1; i++) {
//         totalDistance += distances[route[i]][route[i+1]];
//     }
//     return totalDistance * costPerKm;
// }

// function findOptimalRoute(order) {
//     const centersNeeded = new Set();
//     for (const [product, quantity] of Object.entries(order)) {
//         for (const [center, products] of Object.entries(centers)) {
//             if (product in products) {
//                 centersNeeded.add(center);
//                 break;
//             }
//         }
//     }

//     const allRoutes = [];
//     for (const start of centersNeeded) {
//         const remaining = new Set(centersNeeded);
//         remaining.delete(start);
//         allRoutes.push(...generateRoutes(start, remaining, ['L1']));
//     }

//     let minCost = Infinity;
//     let optimalRoute = null;

//     for (const route of allRoutes) {
//         const cost = calculateRouteCost(route);
//         if (cost < minCost) {
//             minCost = cost;
//             optimalRoute = route;
//         }
//     }

//     return { optimalRoute, minCost };
// }

// function generateRoutes(start, remaining, end) {
//     if (remaining.size === 0) {
//         return [[start, ...end]];
//     }
    
//     const routes = [];
//     for (const nextCenter of remaining) {
//         const newRemaining = new Set(remaining);
//         newRemaining.delete(nextCenter);
//         const subRoutes = generateRoutes(nextCenter, newRemaining, end);
//         for (const subRoute of subRoutes) {
//             routes.push([start, ...subRoute]);
//         }
//     }
    
//     return routes;
// }

// app.post('/calculate-delivery-cost', (req, res) => {
//     const order = req.body;
    
//     if (!order || Object.values(order).some(v => typeof v !== 'number' || v <= 0)) {
//         return res.status(400).json({ error: "Invalid input. Please provide a valid order." });
//     }

//     const weight = calculateWeight(order);
//     if (weight > 10) {
//         return res.status(400).json({ error: "Order exceeds vehicle capacity of 10kg." });
//     }

//     const { optimalRoute, minCost } = findOptimalRoute(order);
    
//     res.json({
//         minimum_cost: minCost,
//         optimal_route: optimalRoute
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`API is running on http://localhost:3000`);
// });