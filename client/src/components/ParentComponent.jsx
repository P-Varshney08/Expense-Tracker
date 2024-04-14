// ParentComponent.jsx
import React, { useState } from 'react';
import AddIncomeForm from './AddIncome.jsx';

const ParentComponent = () => {
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      {showForm ? (
        <AddIncomeForm />
      ) : (
        <Dashboard />
      )}
      <button onClick={toggleForm}>Toggle Form</button>
    </div>
  );
};

export default ParentComponent;
