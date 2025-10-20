import React from 'react';

const Profile = () => {
  return (
    <div className="profile-page">
      <h2>Account Settings</h2>
      <div className="profile-content">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value="User Name" readOnly />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value="user@example.com" readOnly />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" placeholder="Add phone number" />
          </div>
        </div>
        
        <div className="profile-section">
          <h3>Address</h3>
          <p className="empty-text">No saved addresses. Add an address for faster checkout.</p>
          <button className="add-btn">Add Address</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;