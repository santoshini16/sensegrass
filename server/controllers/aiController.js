// controllers/aiController.js
const AIAnalysis = require('../models/AIAnalysis');
const Field = require('../models/Field');
const { GoogleGenerativeAI } = require("@google/generative-ai");


const generateRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);


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


const calculateYieldEstimate = (healthStatus) => {
    switch (healthStatus) {
        case "Optimal": return generateRandom(80, 100);
        case "Moderate": return generateRandom(50, 79);
        case "Poor": return generateRandom(20, 49);
        default: return 0;
    }
};


const generateAIAnalysisByFieldName = async (req, res) => {
    const { fieldName } = req.body;  

    try {
       
        const field = await Field.findOne({ fieldName });
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }

        
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

     
        const healthStatus = getHealthStatus(
            soilHealthData.phLevel, 
            soilHealthData.moistureLevel, 
            soilHealthData.nutrients.nitrogen, 
            soilHealthData.nutrients.phosphorus, 
            soilHealthData.nutrients.potassium
        );

        const yieldEstimate = calculateYieldEstimate(healthStatus);

        
        const aiAnalysis = new AIAnalysis({
            fieldId: field._id,
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


const getAIAnalysisByFieldName = async (req, res) => {
    const { fieldName } = req.params;

    try {
        const field = await Field.findOne({ fieldName });
        if (!field) {
            return res.status(404).json({ message: "Field not found" });
        }

        const analysis = await AIAnalysis.find({ fieldId: field._id }).populate('fieldId');
        if (!analysis.length) {
            return res.status(404).json({ message: "No AI analysis found for this field, Enter your Field name" });
        }

        const latestAnalysis = analysis[0];
        const genAI = new GoogleGenerativeAI(`${process.env.GOOGLEAI_API}`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
         
        const prompt = `
        Analyze the following agricultural data and provide insights:
        Soil Health:
        - pH Level: ${latestAnalysis.soilHealth.phLevel}
        - Moisture Level: ${latestAnalysis.soilHealth.moistureLevel}%
        - Nitrogen: ${latestAnalysis.soilHealth.nutrients.nitrogen}
        - Phosphorus: ${latestAnalysis.soilHealth.nutrients.phosphorus}
        - Potassium: ${latestAnalysis.soilHealth.nutrients.potassium}
        Crop Health:
        - Crop Type: ${latestAnalysis.fieldId.cropType}
        - Health Status: ${latestAnalysis.cropHealth.healthStatus}
        - Yield Estimate: ${latestAnalysis.cropHealth.yieldEstimate}%
        
        Provide insights on soil and crop health and give detailed recommendations for improvement.
        `;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        res.status(200).json({
          success: true,
          analysis: latestAnalysis,
          message: "AI has replied",
          insights: result.response.text(),
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { generateAIAnalysisByFieldName, getAIAnalysisByFieldName };

