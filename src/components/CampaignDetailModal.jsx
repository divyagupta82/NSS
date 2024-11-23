// components/CampaignDetailsModal.js
import React from 'react';
import { motion } from 'framer-motion';

const CampaignDetailsModal = ({ isOpen, onClose, campaign }) => {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-4">{campaign.title}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {campaign.description}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Date:</strong> {new Date(campaign.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Target Amount:</strong> {campaign.target}
        </p>
        <button
          onClick={onClose}
          className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default CampaignDetailsModal;
