import React, { useState } from 'react';
import './Settings.scss';

const Settings = () => {
  const [siteName, setSiteName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [monthlyOrderGoal, setMonthlyOrderGoal] = useState('');

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Logic for saving changes goes here
    console.log({
      siteName,
      supportEmail,
      monthlyOrderGoal
    });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label htmlFor="siteName">Site Name</label>
          <input
            type="text"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supportEmail">Support Email</label>
          <input
            type="email"
            id="supportEmail"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="monthlyOrderGoal">Monthly Order Goal</label>
          <input
            type="number"
            id="monthlyOrderGoal"
            value={monthlyOrderGoal}
            onChange={(e) => setMonthlyOrderGoal(e.target.value)}
          />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;