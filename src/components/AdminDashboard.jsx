import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CampaignRequestList from '../components/CampaignRequestList';
import './AdminDashboard.css';
import AddCampaign from '../components/AddCampaign';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]); // State to hold requests
  const [campaigns, setCampaigns] = useState([]); // State to hold campaigns

  useEffect(() => {
    // Uncomment to fetch actual campaign requests
    axios.get('/api/requests')
      .then(response => setRequests(response.data))
      .catch(error => console.error("Error fetching requests:", error));
  }, []);

  const handleCreateCampaign = (newCampaign) => {
    axios.post('/api/campaigns', newCampaign)
      .then(response => {
        setCampaigns([...campaigns, response.data]);
        // Optionally remove the request from the list after creating the campaign
      })
      .catch(error => console.error("Error creating campaign:", error));
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title mt-2 mb-4">Admin Dashboard</h1>
      <div className="card-container">
        <div className="card">
          <h2 className="card-title mt-2 mb-4">Campaign Requests</h2>
          <CampaignRequestList requests={requests} />
        </div>
        <div className="card">
          <h2 className="card-title mt-2 mb-4 fs-2">Create New Campaign</h2>
          <AddCampaign onCreateCampaign={handleCreateCampaign} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
