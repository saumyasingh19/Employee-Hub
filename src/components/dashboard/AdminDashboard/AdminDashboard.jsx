import React from 'react';
import AllTask from './AllTask';
import Header from '../../Header';
import CreateTask from './CreateTask';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-blue-50">
     <Header/>
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
       <CreateTask/>
        <AllTask />
      </div>
    </div>
  );
};

export default AdminDashboard;