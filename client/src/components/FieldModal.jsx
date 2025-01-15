import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createField, updateField } from '../services/fieldApi';

const FieldModal = ({ isOpen, onClose, onFieldAdded, fieldData }) => {
  const [formData, setFormData] = useState({
    fieldName: '',
    latitude: '',
    longitude: '',
    cropType: '',
    areaSize: '',
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const cropOptions = [
    "Wheat", "Rice", "Corn", "Barley", "Soybean",
    "Sugarcane", "Cotton", "Potato", "Tomato", "Lettuce",
  ];

  useEffect(() => {
    if (isOpen && !mapRef.current) {
      mapRef.current = L.map('map', {
        zoomControl: false,
        attributionControl: false,
      }).setView([20, 77], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);

      if (fieldData) {
    
        setFormData({
          ...fieldData,
          latitude: fieldData.location.latitude,
          longitude: fieldData.location.longitude,
        });

        markerRef.current = L.marker([fieldData.location.latitude, fieldData.location.longitude]).addTo(mapRef.current);
      }

      mapRef.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        }));

        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [isOpen, fieldData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newField;
      if (fieldData) {
        // Update existing field
        newField = await updateField(fieldData._id, {
          fieldName: formData.fieldName,
          location: {
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
          },
          cropType: formData.cropType,
          areaSize: parseFloat(formData.areaSize),
        });
      } else {
        // Create new field
        newField = await createField({
          fieldName: formData.fieldName,
          location: {
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
          },
          cropType: formData.cropType,
          areaSize: parseFloat(formData.areaSize),
        });
      }
  
      
      onFieldAdded(newField); 
  
      onClose();
      
    } catch (error) {
      console.error('Error saving field:', error);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-black bg-opacity-30">
      <div className="p-3 m-2 rounded-lg shadow-lg w-96"
        style={{ background: 'linear-gradient(145deg, #ff9a9e, #fad0c4, #fbc2eb)' }}>

        <h2 className="text-2xl font-bold text-center text-white">{fieldData ? 'Edit Field' : 'Add New Field'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <label className="text-white font-medium">Field Name</label>
          <input
            type="text"
            name="fieldName"
            className="p-2 rounded border"
            onChange={handleChange}
            value={formData.fieldName}
            required
          />

          <label className="text-white font-medium">Select Location</label>
          <div
            id="map"
            style={{
              height: '200px',
              borderRadius: '10px',
              background: 'url(https://img.freepik.com/premium-vector/flat-world-map-with-grid-lines-vector-illustration-background_683773-572.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <p className="text-black text-sm mt-2">Lat: {formData.latitude} | Lng: {formData.longitude}</p>

          <label className="text-white font-bold">Crop Type</label>
          <select
            name="cropType"
            className="p-2 rounded border"
            onChange={handleChange}
            value={formData.cropType}
            required
          >
            <option value="">Select Crop Type</option>
            {cropOptions.map((crop, index) => (
              <option key={index} value={crop}>{crop}</option>
            ))}
          </select>

          <label className="text-white font-medium">Area Size (sq ft)</label>
          <input
            type="number"
            name="areaSize"
            className="p-2 rounded border"
            onChange={handleChange}
            value={formData.areaSize}
            required
          />

          <div className="flex justify-around mt-3">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white font-semibold"
              style={{ background: 'linear-gradient(145deg, #ff758c, #ff7eb3)' }}
            >
              {fieldData ? 'Update Field' : 'Create Field'}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-white font-semibold"
              style={{ background: 'linear-gradient(145deg, #ff5252, #ff7e7e)' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldModal;




