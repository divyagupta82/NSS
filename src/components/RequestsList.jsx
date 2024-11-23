import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {slide_1} from "../components/images/slide_1";

const CampaignRequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);
  const handleApproveRequest = (requestId) => {
    axios.post(`/api/requests/approve/${requestId}`)
      .then(() => {
        setRequests(requests.filter(request => request._id !== requestId));
      })
      .catch(error => console.error("Error approving request:", error));
  };
  
  const handleDeleteRequest = (requestId) => {
    axios.delete(`/api/requests/${requestId}`)
      .then(() => {
        setRequests(requests.filter(request => request._id !== requestId));
      })
      .catch(error => console.error("Error deleting request:", error));
  };
  

  return (
    <div className="container mt-4">
      <div className="row">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={}
                  alt={request.helpType}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{request.name}</h5>
                  <p className="card-text">{request.description}</p>
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      <strong>Email:</strong> {request.email}
                    </small>
                    <small className="text-muted">
                      <strong>Phone:</strong> {request.phone}
                    </small>
                  </div>
                  <div className="text-muted">
                    <strong>Type of Help:</strong> {request.helpType}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No campaign requests at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignRequestList;
