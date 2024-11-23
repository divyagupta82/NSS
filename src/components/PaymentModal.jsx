import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

function PaymentModal({ isOpen, onClose, campaign }) {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    email: '',
    phone: ''  // Add phone to formData state
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log('Processing payment:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ padding: '2rem' }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Make a Donation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">{campaign?.title}</h3>
          <p className="text-gray-600">Your contribution makes a difference</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (₹)
            </label>
            <div className="flex gap-2 mb-4">
              {['500', '1000', '2000', '5000'].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className={`flex-1 py-2 rounded-lg border transition ${
                    formData.amount === amount
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-500'
                  }`}
                  onClick={() => setFormData({ ...formData, amount })}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Other amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:shadow-lg transition duration-300"
          >
            <a href="https://rzp.io/rzp/uFQks8zg">Donate ₹{formData.amount || '0'}</a>
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your transaction is secure and encrypted. By donating, you agree to our terms of service.
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default PaymentModal;
