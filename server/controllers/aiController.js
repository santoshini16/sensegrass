// controllers/aiController.js
const AIAnalysis = require('../models/AIAnalysis');
const Field = require('../models/Field');

// Utility function to generate random values within a range
const generateRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Generate health status based on soil health
const getHealthStatus = (phLevel, moisture, nitrogen, phosphorus, potassium) => {
    if (phLevel >= 6 && phLevel <= 7 &&
        moisture >= 40 && moisture <= 70 &&
        nitrogen > 30 && phosphorus > 20 && potassium > 20) {
        return "Optimal";
    }
    if (moisture < 40 || phLevel < 5.5) {
        return "Poor";
    }
    return "Moderate";
};

// Generate yield estimate based on health status
const calculateYieldEstimate = (healthStatus) => {
    switch (healthStatus) {
        case "Optimal": return generateRandom(80, 100);
        case "Moderate": return generateRandom(50, 79);
        case "Poor": return generateRandom(20, 49);
        default: return 0;
    }
};

// AI Analysis Controller
const generateAIAnalysis = async (req, res) => {
    const { fieldId } = req.params;

    try {
        const field = await Field.findById(fieldId);
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }

        // Simulate soil health data
        const soilHealthData = {
            phLevel: generateRandom(5, 8),
            moistureLevel: generateRandom(30, 80),
            temperature: generateRandom(20, 35),
            nutrients: {
                nitrogen: generateRandom(20, 50),
                phosphorus: generateRandom(15, 40),
                potassium: generateRandom(15, 40)
            }
        };

        // Determine crop health and yield estimate
        const healthStatus = getHealthStatus(
            soilHealthData.phLevel, 
            soilHealthData.moistureLevel, 
            soilHealthData.nutrients.nitrogen, 
            soilHealthData.nutrients.phosphorus, 
            soilHealthData.nutrients.potassium
        );

        const yieldEstimate = calculateYieldEstimate(healthStatus);

        // Create and save the AI analysis entry
        const aiAnalysis = new AIAnalysis({
            fieldId,
            soilHealth: soilHealthData,
            cropHealth: {
                healthStatus,
                yieldEstimate
            }
        });

        await aiAnalysis.save();
        res.status(201).json(aiAnalysis);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch AI analysis by field ID
const getAIAnalysisByField = async (req, res) => {
    const { fieldId } = req.params;
    try {
        const analysis = await AIAnalysis.find({ fieldId }).populate('fieldId');
        if (!analysis.length) {
            return res.status(404).json({ message: "No AI analysis found for this field" });
        }
        res.status(200).json(analysis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { generateAIAnalysis, getAIAnalysisByField };
