
const express = require('express');
const router = express.Router();
const { generateAIAnalysisByFieldName, getAIAnalysisByFieldName } = require('../controllers/aiController');


router.post('/analyze', generateAIAnalysisByFieldName);


router.get('/results/:fieldName', getAIAnalysisByFieldName);


module.exports = router;

