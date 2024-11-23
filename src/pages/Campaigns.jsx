import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    {
      title: "Blood Donation Drive",
      date: "March 15, 2024",
      location: "University Main Campus",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Join us in our mission to save lives through blood donation.",
      target: "₹50,000",
      raised: "₹35,000",
      progress: 70
    },
    {
      title: "Book Collection Drive",
      date: "March 20, 2024",
      location: "Central Library",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      description: "Help us spread knowledge by donating your books.",
      target: "₹30,000",
      raised: "₹20,000",
      progress: 66
    },
    {
      title: "Tree Plantation Drive",
      date: "april 23, 2024",
      location: "On campus",
      image: "https://media.istockphoto.com/id/895609278/photo/protect-nature.webp?a=1&b=1&s=612x612&w=0&k=20&c=0eFTTBZinoDM4OlaQdGcMb4pBnbzONCj05FRqIy93nU=",
      description: "Join us in the tree plantation drive to create a greener, healthier future for generations to come!",
      target: "₹30,000",
      raised: "₹20,000",
      progress: 50
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
     <div className="text-center mb-12">
     <h1 className="text-4xl font-bold text-primary-600 mb-4">Active Campaigns</h1>
<p className="text-primary">Join our ongoing initiatives and make a difference</p>


      </div>

      <div className="grid md:grid-cols-3 gap-9">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={campaign.image} 
                alt={campaign.title}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-semibold text-white mb-2">{campaign.title}</h3>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {campaign.date}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {campaign.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">{campaign.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-600">Progress</span>
                  <span className="font-medium text-primary-600">
                    {campaign.raised} / {campaign.target}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-sm text-gray-500 text-right">
                  {campaign.progress}% of target reached
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 rounded-lg hover:shadow-lg transition duration-300"
                >
                  Donate Now
                </button>
                <button className="flex-1 border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCampaign && (
          <PaymentModal
            isOpen={!!selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
            campaign={selectedCampaign}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Campaigns;