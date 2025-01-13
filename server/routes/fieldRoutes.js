const { createField, getAllFields, updateField, deleteField } = require('../controllers/fieldController');


const express=require('express')


const router = express.Router();

router.post('/fields', createField);
router.get('/fields', getAllFields);
router.put('/fields/:id', updateField);
router.delete('/fields/:id', deleteField);

export default router;
