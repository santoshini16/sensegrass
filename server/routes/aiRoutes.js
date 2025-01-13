// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { generateAIAnalysis, getAIAnalysisByField } = require('../controllers/aiController');

// Generate AI analysis for a specific field
router.post('/analyze/:fieldId', generateAIAnalysis);

// Fetch AI analysis results for a field
router.get('/results/:fieldId', getAIAnalysisByField);

module.exports = router;
