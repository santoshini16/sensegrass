// controllers/fieldController.js
const Field = require('../models/Field');

// Create a new field
 const createField = async (req, res) => {
    try {
        const { fieldName, location, cropType, areaSize } = req.body;
        const field = new Field({ fieldName, location, cropType, areaSize });
        await field.save();
        res.status(201).json({ message: "Field created successfully", field });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all fields
 const getAllFields = async (req, res) => {
    try {
        const fields = await Field.find();
        res.status(200).json(fields);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a field
 const updateField = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedField = await Field.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedField) {
            return res.status(404).json({ message: "Field not found" });
        }
        res.status(200).json(updatedField);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a field
 const deleteField = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedField = await Field.findByIdAndDelete(id);
        if (!deletedField) {
            return res.status(404).json({ message: "Field not found" });
        }
        res.status(200).json({ message: "Field deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {createField,getAllFields,updateField,deleteField}
