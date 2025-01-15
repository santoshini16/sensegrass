import React, { useEffect, useState } from 'react';
import { getAllFields, deleteField } from '../services/fieldApi';
import { motion } from 'framer-motion';
import FieldModal from './FieldModal'; 
import AiReport from './AiReport';

const Dashboard = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentField, setCurrentField] = useState(null); 

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await getAllFields();
        setFields(data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const handleEdit = (fieldId) => {
    const fieldToEdit = fields.find((field) => field._id === fieldId);
    setCurrentField(fieldToEdit);
    setIsModalOpen(true); 
  };

  const handleDelete = async (fieldId) => {
    try {
      await deleteField(fieldId);
      setFields(fields.filter((field) => field._id !== fieldId));
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  const handleFieldAdded = (newField) => {
    setFields((prevFields) => [...prevFields, newField]);
    setLoading(false); // Stop the loading spinner
  };

  return (
    <div className="flex flex-1"> {/* Parent div to ensure full height */}
      <div className="p-6 md:p-12 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-gradient-to-br from-green-100 to-green-300 flex flex-col gap-6 flex-1 w-full h-full"> {/* Overflow set for scrolling */}
        {/* Welcome Message */}
        <div className="text-center h-32 ">
          <h1 className="text-2xl font-extrabold text-green-800 dark:text-green-600">
            Welcome to the Field Management Dashboard
          </h1>
          <p className="text-lg text-green-600 dark:text-green-400 font-bold">
            View and manage all your fields below.
          </p>
        </div>

        {/* Fields Data */}
        <div className='h-full'>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-xl text-gray-600 dark:text-gray-300">Loading fields...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto"> {/* Allow scroll on the grid */}
            {fields.length === 0 ? (
              <div className="flex justify-center items-center w-full h-48">
                <p className="text-xl text-gray-600 dark:text-gray-300">No fields found.</p>
              </div>
            ) : (
              fields.map((field) => (
                <motion.div
                  key={field._id}
                  className="bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white shadow-lg rounded-lg p-3 border border-neutral-200 dark:border-neutral-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold text-white">{field.fieldName}</h3>
                  <p className="text-lg text-gray-300">
                    <strong>Crop Type:</strong> {field.cropType}
                  </p>
                  <p className="text-lg text-gray-300">
                    <strong>Location:</strong> Lat: {field.location.latitude}, Lng: {field.location.longitude}
                  </p>
                  <p className="text-lg text-gray-300">
                    <strong>Area Size:</strong> {field.areaSize} sq ft
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-2 flex justify-around items-center">
                    <button
                      onClick={() => handleEdit(field._id)}
                      className="text-xl font-extrabold text-blue-800 dark:text-blue-600"
                    >
                      Edit
                    </button>
                    <div className="w-[1.5px] h-8 bg-gray-300 mx-4" />
                    <button
                      onClick={() => handleDelete(field._id)}
                      className="text-xl font-extrabold text-red-600 dark:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
        </div>

      </div>
      <FieldModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
        fieldData={currentField} 
        onFieldAdded={handleFieldAdded} 
      />
    </div>
  );
};

export default Dashboard;






