import React from 'react';
import TaskNumber from './TaskNumber';
import TaskList from '../../tasklist/TaskList';
import Header from "../../Header";

const Employe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Employee Dashboard</h1>
          <p className="text-green-600">Manage your tasks and workflow efficiently</p>
        </div>
        
        {/* Task Stats Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Task Overview</h2>
          <TaskNumber />
        </section>
        
        {/* Task List Section */}
        <section>
          <TaskList />
        </section>
      </div>
    </div>
  );
};

export default Employe;