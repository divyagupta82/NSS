import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import MessagePopup from '../components/MessagePopup'; // Import the popup component
import '../MessagePop.css'; // Ensure you import the CSS
import axios from 'axios'; // Import Axios

function RequestHelp() {
  const [formData, setFormData] = useState({
    name: '',
    regno: '',
    email: '',
    phone: '',
    helpType: '',
    description: '',
  });
  
  const [image, setImage] = useState(null); // State to store the image file
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Save the selected image file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('name', formData.name);
    formDataWithImage.append('regno', formData.regno);
    formDataWithImage.append('email', formData.email);
    formDataWithImage.append('phone', formData.phone);
    formDataWithImage.append('helpType', formData.helpType);
    formDataWithImage.append('description', formData.description);
    formDataWithImage.append('image', image); // Append the image to the FormData object

    try {
      // Send a POST request to the backend API to create a new request
      const response = await axios.post('/api/user/requests', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      // Check if the request was successful
      if (response.status === 200 || response.status==201) {
        setPopupMessage('Your request has been submitted successfully!');
      } else {
        setPopupMessage('Failed to submit your request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setPopupMessage('Failed to submit your request. Please try again.');
    }

    setShowPopup(true);

    // Reset form data and image
    setFormData({
      name: '',
      regno: '',
      email: '',
      phone: '',
      helpType: '',
      description: '',
    });
    setImage(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Request Help</h1>
          <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration No
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.regno}
                onChange={(e) => setFormData({...formData, regno: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type of Help Needed
            </label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.helpType}
              onChange={(e) => setFormData({...formData, helpType: e.target.value})}
            >
              <option value="">Select type of help</option>
              <option value="medical">Medical Assistance</option>
              <option value="education">Educational Support</option>
              <option value="food">Food Support</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              name="image"
              required
              onChange={handleImageChange} // Handle image selection
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
          >
            <span>Submit Request</span>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </motion.div>

      {showPopup && (
        <MessagePopup 
          message={popupMessage} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
}

export default RequestHelp;
